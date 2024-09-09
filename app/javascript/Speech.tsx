import React, {useEffect} from 'react';
import {Box, SxProps, Theme, ToggleButton, ToggleButtonGroup} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { playbackButtonStyles, playbackIconStyles } from './styles';

interface SpeechProps {
  sx?: SxProps<Theme>
}

function Speech({sx}: SpeechProps) {

  useEffect(() => {
    startTextToSpeech();
  });

  // iterate through all span.sentence elements and read them out loud
  const startTextToSpeech = async () => {
    console.log('startTextToSpeech');
    const sentences = document.querySelectorAll('div.sentence');
    for (const sentence of sentences) {
      const text = sentence.textContent || "n/a";
      if (text !== null) {
        console.log('speaking text:', text);
        await readText(text);
      }
    }
  }

  const readText = async (text: string) => {
    return new Promise((resolve, reject) => {
      console.log(`starting to read ${text}`);
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      speech.lang = 'en-US';
      speech.onend = () => {
        console.log('finished reading');
        resolve(null);
      }
      // speechSynthesis.speak(speech);
    });
  }


  return (
    <Box sx={sx}>
      <ToggleButtonGroup>
        <ToggleButton value="Play" sx={ playbackButtonStyles }>
          <PlayArrowIcon sx={ playbackIconStyles }/>
        </ToggleButton>
        <ToggleButton value="Play" sx={ playbackButtonStyles }>
          <PauseIcon  sx={ playbackIconStyles }/>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>

  )
}

export default Speech;