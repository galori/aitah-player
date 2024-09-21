import React, {useEffect} from 'react';
import {Box, SxProps, Theme, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { PlayArrow, Pause, FastForward, FastRewind } from '@mui/icons-material';
import { playbackButtonStyles, playbackIconStyles } from './styles';
import EasySpeech from 'easy-speech';
import { useVoiceContext } from './UseVoiceContext';

(window as any).EasySpeech = EasySpeech;

interface SpeechProps {
  sx?: SxProps<Theme>,
  setCurrentlyReading: (index: number | null) => void,
  currentlyReading: number | null,
  setReady: (ready: boolean) => void,
}

function SpeechControls({sx, setCurrentlyReading, currentlyReading, setReady}: SpeechProps) {

  type EasySpeechState = 'playing' | 'paused' | 'stopped';
  type PlaybackControlsState = 'play' | 'pause';

  const [playbackControlsState, setPlaybackControlsState] = React.useState<PlaybackControlsState>('play');
  const [easySpeechState, setEasySpeechState] = React.useState<EasySpeechState>('stopped');
  const [initialized, setInitialized] = React.useState<Boolean>(false);
  const [attemptedToAutoInitialize, setAttemptedToAutoInitialize] = React.useState<Boolean>(false);
  const sentences = document.querySelectorAll('div.sentence');
  const { voice, setVoice } = useVoiceContext();

  if (!voice) {
    throw new Error('VoiceContext voice is null');
  }

  const handlePlaybackChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlaybackState: string,
  ) => {
    console.log('newPlaybackState: ' + newPlaybackState);

    if (newPlaybackState === 'pause') {
      if (easySpeechState === 'playing') {
        EasySpeech.pause();
        setEasySpeechState('paused');
        setPlaybackControlsState('pause');
      }
    }

    if (newPlaybackState === 'play') {
      setPlaybackControlsState('play');
      if (easySpeechState === 'paused') {
        EasySpeech.resume();
        setEasySpeechState('playing');
      } else {
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
    console.log('SpeachControls.tx useEffect() before !initialized && !attemptedToAutoInitialize');
    if (!initialized && !attemptedToAutoInitialize) {
      console.log('SpeachControls.tx useEffect() !initialized && !attemptedToAutoInitialize');
      setAttemptedToAutoInitialize(true);
      initializeSpeech();
    }
  });

  useEffect(() => {
    console.log('SpeachControls.tx useEffect() before !currentlyReading !=== null');
    if (currentlyReading !== null) {
      console.log('SpeachControls.tx useEffect() after !currentlyReading !=== null');
      if (currentlyReading >= sentences.length) {
        setPlaybackControlsState('pause');
        setEasySpeechState('stopped');
        setCurrentlyReading(null);
      } else {
        playCurrentSentence();
      }
    }
  }, [currentlyReading]);

  const initializeSpeech = async () => {
    console.log('SpeachControls.tx initializeSpeech()');
    if (!initialized) {
      console.log('SpeachControls.tx initializeSpeech() !initialized');
      setInitialized(true);

      await Speech.ready();

      // await EasySpeech.init({maxTimeout: 1000, interval: 1000});

      if (voice.name != 'none') {
        console.log('SpeachControls.tx initializeSpeech() after EasySpeech.init(). voice:', voice);
        await startTextToSpeech();
        console.log('SpeachControls.tx initializeSpeech() after startTextToSpeech()');
      } else {
        setEasySpeechState('stopped');
        setPlaybackControlsState('pause');
        setInitialized(false);
        setCurrentlyReading(null);
        setReady(true);
      }
    }
  };

  const startTextToSpeech = async () => {
    setCurrentlyReading(0);
  }

  const playCurrentSentence = async () => {
    console.log('SpeachControls.tx playCurrentSentence()');

    if (currentlyReading !== null) {
      console.log('SpeachControls.tx playCurrentSentence() currentlyReading !== null');
      const sentence = sentences[currentlyReading];
      const text = sentence.textContent || "n/a";
      const wasSuccessful = await readText(text);
      if (wasSuccessful) {
        console.log('SpeachControls.tx playCurrentSentence() wasSuccessful');

        setCurrentlyReading(currentlyReading + 1);
      }
    } else {
      console.log('SpeachControls.tx playCurrentSentence() !wasSuccessful');
      throw new Error('currentlyReading is null');
    }
  }

  type EasySpeechError = {
    error: string;
  }

  const readText = async (text: string) => {
    try {
      console.log('SpeachControls.tx readText()');

      setEasySpeechState('playing');
      console.log('SpeachControls.tx readText() before EasySpeech.speak() voice: ', voice);
      if (voice.name == 'none') {
        await EasySpeech.speak({text: text});
      } else {
        await EasySpeech.speak({text: text, voice: voice});
      }
      console.log('SpeachControls.tx readText() after EasySpeech.speak()');
      return true;
    } catch (error) {
      console.log('SpeachControls.tx readText() catch(error)', error);

      const easySpeechError = error as EasySpeechError;
      if (easySpeechError.error === 'not-allowed') {
        console.log('SpeachControls.tx readText() easySpeechError.error === not-allowed');

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