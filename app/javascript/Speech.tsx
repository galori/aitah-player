import React, {useEffect} from 'react';
import {Box, SxProps, Theme, ToggleButton, ToggleButtonGroup} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { playbackButtonStyles, playbackIconStyles } from './styles';

interface SpeechProps {
  sx?: SxProps<Theme>,
  setCurrentlyReading: (index: number) => void
}

function Speech({sx, setCurrentlyReading}: SpeechProps) {

  const speech = new SpeechSynthesisUtterance();

  const [playbackState, setPlaybackState] = React.useState('play');
  const [alreadyInitialized, setAlreadyInitialized] = React.useState(false);

  const handlePlaybackChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlaybackState: string,
  ) => {
    if (newPlaybackState === 'pause') {
      speechSynthesis.pause();
    } else if (newPlaybackState === 'play') {
      speechSynthesis.resume();
    }
    setPlaybackState(newPlaybackState);
  }

  useEffect(() => {
    if (playbackState === 'play') {
      voicesReady().then(startTextToSpeech);
    }
  });

  const voicesReady = async () => {
    console.log('in voicesReady');
    return new Promise((resolve, reject) => {
      const checkForVoices = () => {
        console.log('checking for voices. speechSynthesis.getVoices().length = ',speechSynthesis.getVoices().length);
        if (speechSynthesis.getVoices().length) {
          console.log('found voices! resolving');
          resolve(null);
        } else {
          console.log('did not find voices! try again in 100ms');
          setTimeout(checkForVoices, 100);
        }
      }
      checkForVoices();
    });
  }


  // iterate through all span.sentence elements and read them out loud
  const startTextToSpeech = async () => {
    if (alreadyInitialized) {
      return;
    }
    setAlreadyInitialized(true);
    console.log('startTextToSpeech');
    const sentences = document.querySelectorAll('div.sentence');
    let index = 0;
    for (const sentence of sentences) {
      const text = sentence.textContent || "n/a";
      if (text !== null) {
        console.log('speaking text:', text);
        setCurrentlyReading(index);
        await readText(text);
        index++;
      }
    }
  }

  const readText = async (text: string) => {
    return new Promise((resolve, reject) => {
      console.log(`starting to read ${text}`);

      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      speech.lang = 'en-US';
      speech.onend = () => {
        console.log('finished reading');
        resolve(null);
      }

      // set the reading voice to US, american female
      const voices = window.speechSynthesis.getVoices();
      console.log('voices:', voices);
      speech.voice = voices.find(voice => voice.lang === 'en-GB') || voices[0];

      speechSynthesis.speak(speech);
    });
  }


  return (
    <Box sx={sx}>
      <ToggleButtonGroup
        value={playbackState}
        exclusive
        onChange={handlePlaybackChange}
      >
        <ToggleButton value="play" sx={ playbackButtonStyles }>
          <PlayArrowIcon sx={ playbackIconStyles }/>
        </ToggleButton>
        <ToggleButton value="pause" sx={ playbackButtonStyles }>
          <PauseIcon  sx={ playbackIconStyles }/>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>

  )
}

export default Speech;