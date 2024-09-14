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

  type EasySpeechState = 'playing' | 'paused' | 'stopped';
  type PlaybackControlsState = 'play' | 'pause';

  const [playbackControlsState, setPlaybackControlsState] = React.useState<PlaybackControlsState>('play');
  const [easySpeechState, setEasySpeechState] = React.useState<EasySpeechState>('stopped');
  const [initialized, setInitialized] = React.useState<Boolean>(false);
  const [attemptedToAutoInitialize, setAttemptedToAutoInitialize] = React.useState<Boolean>(false);

  const handlePlaybackChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlaybackState: string,
  ) => {
    console.log('handlePlaybackChange called. newPlaybackState: ', newPlaybackState);
    if (newPlaybackState === 'pause') {
      if (easySpeechState === 'playing') {
        EasySpeech.pause();
        setEasySpeechState('paused');
        setPlaybackControlsState('pause');
      }
    }

    if (newPlaybackState === 'play') {
      setPlaybackControlsState('play');
      console.log('play pressed');
      if (easySpeechState === 'paused') {
        console.log('paused right now, lets resume');
        EasySpeech.resume();
        setEasySpeechState('playing');
      } else {
        initializeSpeech();
      }
    }

    // if (newPlaybackState === 'pause') {
    //   if (isEasySpeechReading) {
    //     EasySpeech.pause();
    //     setIsEasySpeechPaused(true);
    //     setIsEasySpeechReading(false);
    //     setIsReading(false);
    //   } else if (isReading) {
    //     setIsReading(false);
    //   }
    // } else if (newPlaybackState === 'play') {
    //
    //
    // }
    // setPlaybackState(newPlaybackState);
  }

  useEffect(() => {
    if (!initialized && !attemptedToAutoInitialize) {
      setAttemptedToAutoInitialize(true);
      initializeSpeech();
    }
  });

  const initializeSpeech = async () => {
    if (!initialized) {
      setInitialized(true);
      await EasySpeech.init({maxTimeout: 10000, interval: 1000});
      await startTextToSpeech();
    }
  };

  const startTextToSpeech = async () => {
    const sentences = document.querySelectorAll('div.sentence');
    let index = 0;
    for (const sentence of sentences) {
      console.log('sentence: ', sentence);
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
      setEasySpeechState('playing');
      await EasySpeech.speak({text: text});
      return true;
    } catch (error) {
      console.log('caught error: ', error);
      if (error.error === 'not-allowed') {
        console.log('not-allowed error');
        setEasySpeechState('stopped');
        setPlaybackControlsState('pause');
        setInitialized(false);
      }
      return false;
    }
  }

  return (
    <Box sx={sx}>
      <div>{'playbackControlsState: ' + playbackControlsState }</div>
      <ToggleButtonGroup
        value={playbackControlsState}
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