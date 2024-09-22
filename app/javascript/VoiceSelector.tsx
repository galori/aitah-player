import React, { useState, useEffect, useContext } from 'react';
import EasySpeech from 'easy-speech';
import { Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useVoiceContext } from './UseVoiceContext';
import { Voice, Countries, VoicesByCountry } from './types';

function VoiceSelector({ visible, onClose, ready } : { visible: boolean, onClose: () => void, ready: boolean }) {
  const [countries, setCountries] = useState<Countries>(new Set());
  const [country, setCountry] = useState<string | null>(null);
  const [voicesByCountry, setVoicesByCountry] = useState<VoicesByCountry>({});
  const [loading, setLoading] = useState(true);
  const [alreadyFetched, setAlreadyFetched] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);

  const { voice, setVoice } = useVoiceContext();

  useEffect(() => {
    if (selectedVoice && ready) {
      setVoice(selectedVoice);
    }
  }, [ready, selectedVoice]);

  useEffect(() => {
    if (country === null) return;
    const firstVoiceInCountry = voicesByCountry[country].values().next().value;
    setSelectedVoice(firstVoiceInCountry);
  }, [country]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        await fetchCountriesFromAPI();
      } catch (error) {
      } finally {
        setLoading(false); // Step 2: Set loading to false when done
      }
    }

    if (!alreadyFetched) {
      setAlreadyFetched(true);
      fetchCountries();
    }
  });

  const fetchCountriesFromAPI = async () => new Promise(async (resolve, reject) => {
    await EasySpeech.init({ maxTimeout: 1000, interval: 100 });
    // @ts-ignore
    const voicesFromAPI = await EasySpeech.filterVoices({ language: 'en' });
    const voicesByCountryTmp: VoicesByCountry = {};
    const countriesTmp: Countries = new Set();

    voicesFromAPI.forEach((voice: Voice) => {
      const country = voice.lang.substring(3, 5);
      voicesByCountryTmp[country] = voicesByCountryTmp[country] || new Set();
      voicesByCountryTmp[country].add(voice);
      countriesTmp.add(country);
    });

    setVoicesByCountry(voicesByCountryTmp);
    const firstCountry = countriesTmp.values().next().value;
    setCountry(firstCountry);
    setCountries(countriesTmp);
    const firstVoiceInCountry = voicesByCountryTmp[firstCountry].values().next().value;
    setSelectedVoice(firstVoiceInCountry);

    if (!voice || voice.name == 'none') {
      console.log('VoiceSelector.tsx; setting voice to firstVoiceInCountry', firstVoiceInCountry);
      setVoice(firstVoiceInCountry);
    }

    setLoading(false);
    resolve(null);
  });

  if (loading) return <p>Loading...</p>;

  const handleClick = (voice: Voice) => {
    setSelectedVoice(voice);
    onClose();
  };

  return (
    <Box sx={{ display: visible ? 'block' : 'none' }}>
      <Paper>
        {[...countries].map((country, index) => (
          <Button key={`${country}-${String(index)}`} onClick={() => setCountry(country)}>{country}</Button>
        ))}
      </Paper>
      <Paper>
        { country != null && [...voicesByCountry[country]].map((voice, index) => (
          <Button key={`${voice.name}-${String(index)}`} onClick={() => handleClick(voice)}>{voice.name}</Button>
        ))}
      </Paper>
    </Box>
  );
}

export default VoiceSelector;
