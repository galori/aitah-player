import React, {useEffect} from 'react';
import {Box, SxProps, Theme, ToggleButton, ToggleButtonGroup} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { playbackButtonStyles, playbackIconStyles } from './styles';

interface SpeechProps {
  sx?: SxProps<Theme>,
  setCurrentlyReading: (index: number) => void
}

function SpeechControls({sx, setCurrentlyReading}: SpeechProps) {

  const [playbackState, setPlaybackState] = React.useState('play');

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
    console.log('in useEffect');
    if (playbackState === 'play') {
      voicesReady().then(speechReady).then(startTextToSpeech);
    }

    return () => {
      speechSynthesis.cancel();
    }
  }, [playbackState]);

  const speechReady = async () => {
    return new Promise((resolve, reject) => {
      const checkForSpeech = () => {
        if (speechSynthesis.speaking && !speechSynthesis.paused) {
          console.log('speech is on, cancelling');
          speechSynthesis.cancel();
          setTimeout(checkForSpeech, 100);
        } else {
          resolve(null);
        }
      }
      checkForSpeech();
    });
  }

  const voicesReady = async () => {
    return new Promise((resolve, reject) => {
      const checkForVoices = () => {
        if (speechSynthesis.getVoices().length) {
          resolve(null);
        } else {
          setTimeout(checkForVoices, 100);
        }
      }
      checkForVoices();
    });
  }


  // iterate through all span.sentence elements and read them out loud
  const startTextToSpeech = async () => {
    console.log('startTextToSpeech');
    const sentences = document.querySelectorAll('div.sentence');
    let index = 0;
    for (const sentence of sentences) {
      const text = sentence.textContent || "n/a";
      if (text !== null) {
        // console.log('speaking text:', text);
        setCurrentlyReading(index);
        await readText(text);
        index++;
      }
    }
  }

  const readText = async (text: string) => {
    return new Promise((resolve, reject) => {

      const speech = new SpeechSynthesisUtterance();

      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      speech.lang = 'en-US';
      speech.onend = () => {
        resolve(null);
      }

      // set the reading voice to US, american female
      const voices = window.speechSynthesis.getVoices();
      // find female, US voice
      speech.voice = voices.find(voice => voice.lang === 'en-US' && voice.name === 'Google US English') || voices[0];

      // speech.voice = voices.find(voice => voice.lang === 'en-US') || voices[0];

      speechSynthesis.speak(speech);
    });
  }


  return (
    <Box sx={sx}>
      <div>{'playbackState: ' + playbackState}</div>
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

export default SpeechControls;