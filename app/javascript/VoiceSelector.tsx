import React, { useState, useEffect } from 'react';
import EasySpeech from 'easy-speech';
import {Box} from "@mui/material";

function VoiceSelector() {

  const [countries, setCountries] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const voicesList = async () => {
    await EasySpeech.init({maxTimeout: 10000, interval: 1000});
    return await EasySpeech.filterVoices('en-US');
  }

  useEffect(() => {
    async function fetchCountries() {
      try {
        await fetchCountriesFromAPI(); // Assume this fetches the voices
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false); // Step 2: Set loading to false when done
      }
    }

    fetchCountries();
  }, []);



  const fetchCountriesFromAPI = async () => {
    return new Promise(async (resolve, reject) => {
      await EasySpeech.init({maxTimeout: 10000, interval: 1000});
      type Voice = { lang: string; }
      const filteredVoices = await EasySpeech.filterVoices({language: 'en'});
      console.log(`filteredVoices: ${JSON.stringify(filteredVoices)}`);
      const countrySet = filteredVoices
        .reduce((result: Set<string>, voice: Voice) => {
          const country = voice.lang.substring(3, 5);
          result.add(country);
          return result
        }, new Set());
      console.log('setting countries: ', countrySet);
      setCountries(countrySet);
    });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Box>
      {console.log('DEBUG rendering countries: ', countries) + ''}
      {[...countries].map((country, index) => (
        <div key={country + '-' + String(index)}>{country}</div>
      ))}
    </Box>
  );
}

export default VoiceSelector;