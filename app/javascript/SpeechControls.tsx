import React, {useEffect} from 'react';
import {Box, SxProps, Theme, ToggleButton, ToggleButtonGroup} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { playbackButtonStyles, playbackIconStyles } from './styles';
import EasySpeech from 'easy-speech';

interface SpeechProps {
  sx?: SxProps<Theme>,
  setCurrentlyReading: (index: number) => void
}

function SpeechControls({sx, setCurrentlyReading}: SpeechProps) {

  const [playbackState, setPlaybackState] = React.useState('play');
  const [isReading, setIsReading] = React.useState(false);

  const handlePlaybackChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlaybackState: string,
  ) => {
    if (newPlaybackState === 'pause') {
      EasySpeech.stop();
      setIsReading(false);
    } else if (newPlaybackState === 'play') {
    }
    setPlaybackState(newPlaybackState);
  }

  useEffect(() => {
    const initializeSpeech = async () => {
      if (playbackState === 'play' && !isReading) {
        await EasySpeech.init(); // required argument
        await startTextToSpeech();
      }
    };
    initializeSpeech();
  }, [playbackState, isReading]);

  const startTextToSpeech = async () => {
    const sentences = document.querySelectorAll('div.sentence');
    let index = 0;
    for (const sentence of sentences) {
      const text = sentence.textContent || "n/a";
      if (text !== null) {
        setCurrentlyReading(index);
        const wasSuccessful = await readText(text);
        if (!wasSuccessful) {
          return;
        }
        index++;
      }
    }
  }

  const readText = async (text: string) => {
    try {
      await EasySpeech.speak({text: text});
      setIsReading(true);
      return true;
    } catch (error) {
      setIsReading(false);
      setPlaybackState('pause');
      return false;
    }
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