import React, {useContext, useCallback, useEffect, useRef} from "react";
import {Box, Container, SxProps, Theme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Speech from "./speech/Speech";
import AppContext from "./contexts/AppContext";
import {SHOULD_AUTO_PLAY, DEBUG} from "./initialize/config";
import iOS from "./iOS";
import {EasySpeechState, Voice} from "./types";
import useVoiceContext from "./UseVoiceContext";
import Icon from "./components/Icon";

interface SpeechProps {
  sx?: SxProps<Theme>;
  setCurrentlyReading: (index: number | null) => void;
  currentlyReading: number | null;
  easySpeechState: "playing" | "paused" | "stopped";
  setEasySpeechState: (state: EasySpeechState) => void;
}

function SpeechControls({
                          sx = {},
                          setCurrentlyReading,
                          currentlyReading,
                          easySpeechState,
                          setEasySpeechState
                        }: SpeechProps) {

  type PlaybackState = "play" | "pause" | null;

  const [playbackState, setPlaybackState] =
    React.useState<PlaybackState>("play");
  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [attemptedToAutoInitialize, setAttemptedToAutoInitialize] =
    React.useState<boolean>(false);
  const sentences = document.querySelectorAll("div.sentence");
  const {voice} = useVoiceContext();
  const prevCurrentlyReadingRef = useRef<number | null>(null);
  const prevVoiceRef = useRef<Voice | null>(null);
  const latestReadTextIdRef = useRef<number>(0);
  const prevPlaybackStateRef = useRef<PlaybackState>(null);

  if (!voice) {
    throw new Error("VoiceContext voice is null");
  }

  type EasySpeechError = {
    error: string;
  };

  const readText = useCallback(
    async (text: string) => {
      latestReadTextIdRef.current += 1;
      const currentReadId = latestReadTextIdRef.current;

      try {
        if (iOS.isWebView()) {
          const wasSuccessful = await new Promise<boolean>((resolve) => {
            const handler = () => {
              if (currentReadId === latestReadTextIdRef.current) {
                resolve(true);
              } else {
                resolve(false);
              }
              window.removeEventListener("speech-done", handler);
            };
            window.addEventListener("speech-done", handler);
            if (DEBUG) console.log("speak: ", text);
            window.webkit.messageHandlers.speakHandler.postMessage(text);
          });
          return wasSuccessful;
        }
        await Speech.speak({text, voice});
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
  }, [voice, initialized, attemptedToAutoInitialize, initializeSpeech, setEasySpeechState]);


  const playCurrentSentence = useCallback(async () => {
    console.log('playCurrentSentence. currentlyReading:', currentlyReading);

    if (currentlyReading !== null) {
      setEasySpeechState("playing");
      setPlaybackState("play");

      const sentence = sentences[currentlyReading - 1];
      const text = sentence.textContent ?? "";
      const wasSuccessful = await readText(text);
      if (wasSuccessful) {
        console.log('readText wasSuccessful:', wasSuccessful, 'increasing currentlyReading from', currentlyReading, 'to', currentlyReading + 1);
        setCurrentlyReading(currentlyReading + 1);
      } else {
        console.log('readText wasSuccessful:', wasSuccessful, 'not increasing currentlyReading');
      }
    } else {
      throw new Error("currentlyReading is null");
    }

  }, [currentlyReading, sentences, readText, setCurrentlyReading, setEasySpeechState]);


  const handlePlaybackChange = (newPlaybackState: PlaybackState) => {
    console.log('handlePlaybackChange(). newPlaybackState=', newPlaybackState);

    if (newPlaybackState === prevPlaybackStateRef.current) {
      console.log('returning due to no change. newPlaybackState=', newPlaybackState, 'prevPlaybackStateRef.current=', prevPlaybackStateRef.current);
      return;
    }

    setPlaybackState(newPlaybackState);

    if (newPlaybackState === "pause") {
      console.log('handlePlaybackChange: pausing. newPlaybackState=', newPlaybackState, 'easySpeechState=', easySpeechState);
      if (easySpeechState === "playing") {
        Speech.pause();
        // if (iOS.isWebView()) {
        //   iOS.pause();
        // } else {
        //   EasySpeech.pause();
        // }
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
          // if (iOS.isWebView()) {
          //   iOS.continue();
          // } else {
          //   EasySpeech.resume();
          // }
          Speech.resume();
          setEasySpeechState("playing");
        }
      }
    }

    prevPlaybackStateRef.current = newPlaybackState;
  }

  const skipForward = () => {
    setPlaybackState("play");
    prevPlaybackStateRef.current = 'play';
    setCurrentlyReading((currentlyReading ?? 0) + 1);
  }

  const skipBackward = () => {
    setPlaybackState("play");
    prevPlaybackStateRef.current = 'play';
    setCurrentlyReading((currentlyReading ?? 0) - 1);
  }

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
    playbackState,
    setEasySpeechState
  ]);

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error('useAppContext must be used within a AppContextProvider');
  const {setCurrentPostIndex, currentPostIndex, posts} = appContext;
  const navigate = useNavigate();

  const handleNextPost = () => {
    if (currentPostIndex === posts.length - 1) return;
    setPlaybackState("pause");
    setEasySpeechState("stopped");
    setCurrentlyReading(null);

    console.log('handleNextPost: ',posts)
    const newPostIndex = (currentPostIndex ?? 0) + 1;
    const newPostId = posts[newPostIndex].id;
    setCurrentPostIndex(newPostIndex);
    navigate(`/post/${newPostId}`);
  }

  const handlePrevPost = () => {
    if (currentPostIndex === null || currentPostIndex === 0) return;

    setPlaybackState("pause");
    setEasySpeechState("stopped");
    setCurrentlyReading(null);
    const newPostIndex = (currentPostIndex ?? 0) - 1;
    const newPostId = posts[newPostIndex].id;
    setCurrentPostIndex(newPostIndex);
    navigate(`/post/${newPostId}`);
  }

  return (
    <Box sx={sx}>
      {DEBUG && <Container sx={{
        position: 'fixed',
        left: '2px',
        top: '2px'
      }}>{playbackState} | {easySpeechState} | {currentlyReading} | ref = {prevPlaybackStateRef.current ?? 'null'} | {voice.name}</Container>}
      <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: 1}}>
        <Icon ariaLabel='Rewind' name='undo' circle size='2x' onClick={skipBackward} />
        {playbackState === 'pause' && <Icon ariaLabel='Play' name='play' circle nudge={5} size='4x' onClick={() => {
          setPlaybackState('play');
          handlePlaybackChange('play')
        }}/>}
        {playbackState === 'play' && <Icon ariaLabel='Pause' name='pause' circle size='4x' onClick={() => {
          setPlaybackState('pause');
          handlePlaybackChange('pause');
        }}/>}
        <Icon ariaLabel='Fast Forward' name='repeat' circle size='2x' onClick={skipForward}/>

      </Box>

      <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: 1}}>
        <Icon name='arrow-left' circle onClick={handlePrevPost} ariaLabel='Previous Post'/>
        <Icon name='step-backward' circle ariaLabel='Next Comment Thread'/>
        <Icon name='step-forward' circle ariaLabel='Previous Comment Thread'/>
        <Icon name='arrow-right' circle onClick={handleNextPost} ariaLabel='Next Post'/>
      </Box>
    </Box>
  );
}

export default SpeechControls;
