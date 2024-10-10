import React, {useCallback, useEffect, useRef} from "react";
import {
  Box, Container,
  SxProps,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import EasySpeech from "easy-speech";
import {FastForward, FastRewind, Pause, PlayArrow} from "@mui/icons-material";
import {SHOULD_AUTO_PLAY, DEBUG} from "./initialize/config";
import iOS from "./iOS";
import {playbackButtonStyles, playbackIconStyles} from "./styles";
import {Voice} from "./types";
import useVoiceContext from "./UseVoiceContext";


interface SpeechProps {
  sx?: SxProps<Theme>;
  setCurrentlyReading: (index: number | null) => void;
  currentlyReading: number | null;
}


function SpeechControls({
                          sx = {},
                          setCurrentlyReading,
                          currentlyReading,
                        }: SpeechProps) {

  type EasySpeechState = "playing" | "paused" | "stopped";
  type PlaybackState = "play" | "pause" | "fast-forward" | "fast-rewind";

  const [playbackState, setPlaybackState] =
    React.useState<PlaybackState>("play");
  const [easySpeechState, setEasySpeechState] =
    React.useState<EasySpeechState>("stopped");
  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [attemptedToAutoInitialize, setAttemptedToAutoInitialize] =
    React.useState<boolean>(false);
  const sentences = document.querySelectorAll("div.sentence");
  const {voice} = useVoiceContext();
  const prevCurrentlyReadingRef = useRef<number | null>(null);
  const prevVoiceRef = useRef<Voice | null>(null);

  if (!voice) {
    throw new Error("VoiceContext voice is null");
  }

  type EasySpeechError = {
    error: string;
  };

  const readText = useCallback(
    async (text: string) => {
      try {
        if (iOS.isWebView()) {
          await iOS.speak(text);
        } else {
          await EasySpeech.speak({text, voice});
        }
        return true;
      } catch (error) {
        const easySpeechError = error as EasySpeechError;
        if (easySpeechError.error === "not-allowed") {
          setEasySpeechState("stopped");
          setPlaybackState("pause");
          setInitialized(false);
          setCurrentlyReading(null);
        }
        return false;
      }
    },
    [
      setCurrentlyReading,
      setInitialized,
      setPlaybackState,
      setEasySpeechState,
      voice
    ]
  );

  const initializeSpeech = useCallback(async () => {
    if (DEBUG) {
      console.log('initializeSpeech');
    }
    if (!initialized) {
      if (DEBUG) {
        console.log('initializing');
      }
      setInitialized(true);
      setEasySpeechState("playing");
      setCurrentlyReading(1);
    } else if (DEBUG) {
      console.log('already initialized');
    }
  }, [initialized, setCurrentlyReading, setEasySpeechState]);


  useEffect(() => {
    if (voice && prevVoiceRef.current !== voice) {
      if (!initialized && !attemptedToAutoInitialize) {
        if (SHOULD_AUTO_PLAY) {
          setAttemptedToAutoInitialize(true);
          initializeSpeech().catch(console.error);
        } else {
          setPlaybackState("pause");
          setEasySpeechState("stopped");
        }
      }
    }

    prevVoiceRef.current = voice;
  }, [voice, initialized, attemptedToAutoInitialize, initializeSpeech]);


  const playCurrentSentence = useCallback(async () => {
    console.log('playCurrentSentence. currentlyReading:', currentlyReading);

    if (currentlyReading !== null) {
      setEasySpeechState("playing");
      setPlaybackState("play");

      const sentence = sentences[currentlyReading - 1];
      const text = sentence.textContent ?? "";
      const wasSuccessful = await readText(text);
      if (wasSuccessful) {
        setCurrentlyReading(currentlyReading + 1);
      }
    } else {
      throw new Error("currentlyReading is null");
    }

  }, [currentlyReading, sentences, readText, setCurrentlyReading]);


  const handlePlaybackChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlaybackState: PlaybackState,
  ) => {

    setPlaybackState(newPlaybackState);

    if (newPlaybackState === "pause") {
      if (easySpeechState === "playing") {
        if (iOS.isWebView()) {
          iOS.pause();
        } else {
          EasySpeech.pause();
        }
        setEasySpeechState("paused");
      }
    }

    if (newPlaybackState === "play") {
      if (!initialized) {
        initializeSpeech();
      } else {
        if (easySpeechState === "stopped") {
          playCurrentSentence().catch(console.error);
        }
        if (easySpeechState === "paused") {
          if (iOS.isWebView()) {
            iOS.continue();
          } else {
            EasySpeech.resume();
          }
          setEasySpeechState("playing");
        }
      }
    }

    if (newPlaybackState === "fast-forward") {
      setPlaybackState("play");
      const fastForward = () => {
        if (currentlyReading !== null) {
          if (easySpeechState === "paused" || easySpeechState === "playing") {
            setEasySpeechState("stopped");
            if (iOS.isWebView()) {
              iOS.stop();
            } else {
              EasySpeech.cancel();
            }
          }
          setCurrentlyReading(currentlyReading + 1);
        }
      }

      setTimeout(fastForward, 10000);
    }
  };

  useEffect(() => {
    if (currentlyReading && currentlyReading !== prevCurrentlyReadingRef.current) {
      if (currentlyReading >= sentences.length) {
        setPlaybackState("pause");
        setEasySpeechState("stopped");
        setCurrentlyReading(null);
      } else {
        playCurrentSentence();
      }
    }

    prevCurrentlyReadingRef.current = currentlyReading;
  }, [
    currentlyReading,
    playCurrentSentence,
    sentences.length,
    setCurrentlyReading,
    playbackState
  ]);

  return (
    <Box sx={sx}>
      {DEBUG && <Container sx={{
        position: 'fixed',
        left: '2px',
        top: '2px'
      }}>{playbackState} | {easySpeechState} | {currentlyReading} </Container>}
      <ToggleButtonGroup
        value={playbackState}
        exclusive
        onChange={handlePlaybackChange}
      >
        <ToggleButton value="fast-rewind" sx={playbackButtonStyles}>
          <FastRewind sx={playbackIconStyles}/>
        </ToggleButton>
        <ToggleButton value="play" sx={playbackButtonStyles}>
          <PlayArrow sx={playbackIconStyles}/>
        </ToggleButton>
        <ToggleButton value="pause" sx={playbackButtonStyles}>
          <Pause sx={playbackIconStyles}/>
        </ToggleButton>
        <ToggleButton value="fast-forward" sx={playbackButtonStyles}>
          <FastForward sx={playbackIconStyles}/>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default SpeechControls;
