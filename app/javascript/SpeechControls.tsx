import React, {useEffect} from 'react';
import {Box, SxProps, Theme, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { PlayArrow, Pause, FastForward, FastRewind } from '@mui/icons-material';
import { playbackButtonStyles, playbackIconStyles } from './styles';
import EasySpeech from 'easy-speech';

interface SpeechProps {
  sx?: SxProps<Theme>,
  setCurrentlyReading: (index: number | null) => void,
  currentlyReading: number | null,
}

function SpeechControls({sx, setCurrentlyReading, currentlyReading}: SpeechProps) {

  type EasySpeechState = 'playing' | 'paused' | 'stopped';
  type PlaybackControlsState = 'play' | 'pause';

  const [playbackControlsState, setPlaybackControlsState] = React.useState<PlaybackControlsState>('play');
  const [easySpeechState, setEasySpeechState] = React.useState<EasySpeechState>('stopped');
  const [initialized, setInitialized] = React.useState<Boolean>(false);
  const [attemptedToAutoInitialize, setAttemptedToAutoInitialize] = React.useState<Boolean>(false);

  const sentences = document.querySelectorAll('div.sentence');

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
      console.log('play pressed. easySpeechState:', easySpeechState);
      if (easySpeechState === 'paused') {
        console.log('paused right now, lets resume');
        EasySpeech.resume();
        setEasySpeechState('playing');
      } else {
        console.log('not paused, lets start from the beginning');
        initializeSpeech();
      }
    }

    if (newPlaybackState === 'fast-forward') {
      if (currentlyReading !== null) {
        setCurrentlyReading(currentlyReading + 1);
      }
    }

    if (newPlaybackState === 'fast-rewind') {
      if (currentlyReading !== null && currentlyReading > 0) {
        setCurrentlyReading(currentlyReading - 1);
      }
    }

  }

  useEffect(() => {
    console.log('useEffect() for [initialized]. initialized: ', initialized, 'currentlyReading: ', currentlyReading);
    if (!initialized && !attemptedToAutoInitialize) {
      setAttemptedToAutoInitialize(true);
      initializeSpeech();
    }
  });

  useEffect(() => {
    console.log('useEffect() for [currentlyReading]. currentlyReading: ', currentlyReading);
    if (currentlyReading !== null) {
      if (currentlyReading >= sentences.length) {
        setPlaybackControlsState('pause');
        setEasySpeechState('stopped');
        setCurrentlyReading(null);
      } else {
        console.log('useEffect() for [currentlyReading]. currentlyReading: ', currentlyReading, ' starting playCurrentSentence');
        playCurrentSentence();
      }
    }
  }, [currentlyReading]);

  const initializeSpeech = async () => {
    console.log('initializeSpeech(): initialized: ', initialized);
    if (!initialized) {
      setInitialized(true);
      console.log('initializeSpeech(): initializing easyspeech');
      await EasySpeech.init({maxTimeout: 10000, interval: 1000});
      console.log('initializeSpeech(): calling startTextToSpeech()');
      await startTextToSpeech();
    }
  };

  const startTextToSpeech = async () => {
    console.log('startTextToSpeech(). currentlyReading: ', currentlyReading);
    setCurrentlyReading(0);
  }

  const playCurrentSentence = async () => {
    console.log('playCurrentSentence called. currentlyReading: ', currentlyReading);
    if (currentlyReading !== null) {
      const sentence = sentences[currentlyReading];
      const text = sentence.textContent || "n/a";
      const wasSuccessful = await readText(text);
      if (wasSuccessful) {
        setCurrentlyReading(currentlyReading + 1);
      }
    } else {
      throw new Error('currentlyReading is null');
    }
  }

  type EasySpeechError = {
    error: string;
  }

  const readText = async (text: string) => {
    try {
      setEasySpeechState('playing');
      await EasySpeech.speak({text: text});
      return true;
    } catch (error) {
      const easySpeechError = error as EasySpeechError;
      if (easySpeechError.error === 'not-allowed') {
        console.log('not-allowed error');
        setEasySpeechState('stopped');
        setPlaybackControlsState('pause');
        setInitialized(false);
        setCurrentlyReading(null);
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
        <ToggleButton value="fast-rewind" sx={ playbackButtonStyles }>
          <FastRewind sx={ playbackIconStyles }/>
        </ToggleButton>
        <ToggleButton value="play" sx={ playbackButtonStyles }>
          <PlayArrow sx={ playbackIconStyles }/>
        </ToggleButton>
        <ToggleButton value="pause" sx={ playbackButtonStyles }>
          <Pause  sx={ playbackIconStyles }/>
        </ToggleButton>
        <ToggleButton value="fast-forward" sx={ playbackButtonStyles }>
          <FastForward  sx={ playbackIconStyles }/>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>

  )
}

export default SpeechControls;