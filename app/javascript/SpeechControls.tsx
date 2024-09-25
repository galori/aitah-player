import React, {useCallback, useEffect, useRef} from "react";
import {
  Box,
  SxProps,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {FastForward, FastRewind, Pause, PlayArrow} from "@mui/icons-material";
import EasySpeech from "easy-speech";
import {playbackButtonStyles, playbackIconStyles} from "./styles";
import useVoiceContext from "./UseVoiceContext";
import { SHOULD_AUTO_PLAY } from "./initialize/config";

declare global {
  interface Window {
    EasySpeech: typeof EasySpeech;
  }
}

window.EasySpeech = EasySpeech;

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
  type PlaybackState = "play" | "pause";

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

  if (!voice) {
    throw new Error("VoiceContext voice is null");
  }

  type EasySpeechError = {
    error: string;
  };

  const readText = useCallback(
    async (text: string) => {
      console.log("SpeechControls.tsx : readText()");
      try {
        console.log("SpeechControls.tsx : readText() try{}");
        await EasySpeech.speak({text, voice});
        return true;
      } catch (error) {
        console.log("SpeechControls.tsx : readText() catch{}");
        const easySpeechError = error as EasySpeechError;
        if (easySpeechError.error === "not-allowed") {
          setEasySpeechState("stopped");
          console.log('setting setPlaybackState("pause")');
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
      voice,
    ],
  );

  const playCurrentSentence = useCallback(async () => {
    console.log("SpeachControls.tx playCurrentSentence()");

    if (currentlyReading !== null) {
      const sentence = sentences[currentlyReading];
      const text = sentence.textContent || "n/a";
      const wasSuccessful = await readText(text);
      if (wasSuccessful) {
        setCurrentlyReading(currentlyReading + 1);
      }
    } else {
      throw new Error("currentlyReading is null");
    }
  }, [currentlyReading, sentences, readText, setCurrentlyReading]);

  const initializeSpeech = useCallback(async () => {
    if (!initialized) {
      setInitialized(true);
      setEasySpeechState("playing");
      setCurrentlyReading(0);
    }
  }, [initialized, setCurrentlyReading, setEasySpeechState]);

  const handlePlaybackChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlaybackState: string,
  ) => {
    console.log(`SpeechControls.tsx : newPlaybackState: ${newPlaybackState}`);

    if (newPlaybackState === "pause") {
      console.log("SpeechControls.tsx : newPlaybackState === pause");
      if (easySpeechState === "playing") {
        console.log("SpeechControls.tsx : easySpeechState === playing. Pausing EasySpeech");
        EasySpeech.pause();
        setEasySpeechState("paused");
        console.log(`setEasySpeechState == ${easySpeechState}`);
        setPlaybackState("pause");
      }
    }

    if (newPlaybackState === "play") {
      setPlaybackState("play");
      if (!initialized) {
        initializeSpeech();
      } else {
        if (easySpeechState === "stopped") {
          setEasySpeechState("playing");
          playCurrentSentence().catch(console.error);
        }
        if (easySpeechState === "paused") {
          EasySpeech.resume();
          setEasySpeechState("playing");
        }
      }
    }

    if (newPlaybackState === "fast-forward") {
      if (currentlyReading !== null) {
        setCurrentlyReading(currentlyReading + 1);
        if (easySpeechState === "paused") {
          setEasySpeechState("stopped");
          EasySpeech.cancel();
        }
      }
    }

    if (newPlaybackState === "fast-rewind") {
      if (currentlyReading !== null && currentlyReading > 0) {
        setCurrentlyReading(currentlyReading - 1);
        if (easySpeechState === "paused") {
          setEasySpeechState("stopped");
          EasySpeech.cancel();
        }
      }
    }
  };

  useEffect(() => {
    console.log("SpeechControls.tsx : useEffect(() for voice. voice: ", voice);
    if (voice && !initialized && !attemptedToAutoInitialize && SHOULD_AUTO_PLAY) {
      console.log("SpeechControls.tsx : useEffect(() for voice. In condition");
      setAttemptedToAutoInitialize(true);
      initializeSpeech().catch(console.error);
    } else {
      // setEasySpeechState("stopped");
      setPlaybackState("pause");
    }
  }, [voice, initialized, attemptedToAutoInitialize, initializeSpeech]);

  useEffect(() => {
    console.log("SpeechControls.tsx : useEffect(() for currentlyReading. currentlyReading: ", currentlyReading, " prevCurrentlyReadingRef.current: ", prevCurrentlyReadingRef.current);
    if (currentlyReading !== null && currentlyReading !== prevCurrentlyReadingRef.current && playbackState === "play") {
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
      <div>{`playbackState: ${playbackState}`}</div>
      <div>{`easySpeechState: ${easySpeechState}`}</div>

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
