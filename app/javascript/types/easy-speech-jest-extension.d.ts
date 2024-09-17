import EasySpeech from './easy-speech-extension';

declare module './easy-speech-extension' {
  interface EasySpeechStatic {
    filterVoices(options?: { language?: string }): Promise<SpeechSynthesisVoice[]>;
  }

  const EasySpeech: EasySpeechStatic;
  export default EasySpeech;
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledWith(...args: any[]): R;
    }
  }
}