import EasySpeech from "easy-speech";
import Speech from "../speech/Speech";
import SpeechMock from "../__mocks__/SpeechMock";

declare global {
  interface Window {
    EasySpeech: typeof EasySpeech;
    webkit: {
      messageHandlers: {
        logHandler: {
          postMessage: (message: string) => void;
        };
        speakHandler: {
          postMessage: (text: string) => void;
        };
        pauseHandler: {
          postMessage: (text: string) => void;
        };
        speechHandler: {
          postMessage: (text: string) => void;
        }
      };
    };
    speechDone: () => void;
    nativeEvent: (message: string) => void;
    Speech: typeof Speech;
    SpeechMock: typeof SpeechMock;
  }
}

