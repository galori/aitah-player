import React, {useState, useEffect} from 'react';
import EasySpeech from 'easy-speech';
import {Box, Paper} from "@mui/material";
import {Link} from "react-router-dom";

function VoiceSelector({setSelectedVoice}: {setSelectedVoice: (voice: string) => void}) {

  const [countries, setCountries] = useState<Countries>(new Set());
  const [country, setCountry] = useState<string | null>(null);
  const [voices, setVoices] = useState<{[key: string]: Set<string>}>({});
  const [loading, setLoading] = useState(true);
  const [alreadyFetched, setAlreadyFetched] = useState(false);

  console.log('DEBUGDEBUG in VoiceSelector()');

  useEffect(() => {
    if (country === null) return;
    const firstVoiceInCountry = voices[country].values().next().value;
    setSelectedVoice(firstVoiceInCountry);
  }, [country]);

  useEffect(() => {
    console.log('DEBUGDEBUG in useEffect()');
    async function fetchCountries() {
      try {
        console.log('DEBUGDEBUG in useEffect(), before fetchCountriesFromAPI');
        await fetchCountriesFromAPI();
        console.log('DEBUGDEBUG after fetchCountriesFromAPI');
      } catch (error) {
        console.error('DEBUGDEBUG Error fetching countries:', error);
      } finally {
        console.log('DEBUGDEBUG setting loading to false');
        setLoading(false); // Step 2: Set loading to false when done
      }
    }

    if (!alreadyFetched) {
      setAlreadyFetched(true);
      fetchCountries();
    }
  });

  type Voice = { name: string; lang: string; }
  type Voices = { [key: string]: Set<string> };
  type Countries = Set<string>;

  const fetchCountriesFromAPI = async () => {
    return new Promise(async (resolve, reject) => {
      debugger;
      await EasySpeech.init({maxTimeout: 10000, interval: 1000});
      // @ts-ignore
      const voicesFromAPI = await EasySpeech.filterVoices({language: 'en'});
      const voicesTmp: Voices = {};
      const countriesTmp: Countries = new Set();

      voicesFromAPI.forEach((voice: Voice) => {
        const country = voice.lang.substring(3, 5);
        voicesTmp[country] = voicesTmp[country] || new Set();
        voicesTmp[country].add(voice.name);

        countriesTmp.add(country);
      });

      setVoices(voicesTmp);
      const firstCountry = countriesTmp.values().next().value;
      setCountry(firstCountry);
      setCountries(countriesTmp);
      const firstVoiceInCountry = voicesTmp[firstCountry].values().next().value;
      setSelectedVoice(firstVoiceInCountry);
      setLoading(false);
      resolve(null);
    });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Box>
      <Paper>
        {[...countries].map((country, index) => (
          <Link key={country + '-' + String(index)} to="http://google.com" onClick={() => setCountry(country)}>{country}</Link>
        ))}
      </Paper>
      <Paper>
        { country != null && [...voices[country]].map((voice, index) => (
          <div key={voice + '-' + String(index)}>{voice}</div>
        ))}
      </Paper>
    </Box>
  );
}

export default VoiceSelector;