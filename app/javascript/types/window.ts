import EasySpeech from "easy-speech";

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
  }
}

