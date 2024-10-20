import EasySpeech from 'easy-speech';
import {Voice} from "../types";
import {} from "../types/window";

class Speech {

  public static async speak({text, voice}:{text:string, voice: Voice}):Promise<void> {
    await EasySpeech.speak({text, voice});
  }

  public static async init():Promise<boolean> {
    await EasySpeech.init({maxTimeout: 1000, interval: 100});
    return true;
  }

  public static pause(): void {
    EasySpeech.pause();
  }

  public static resume(): void {
    EasySpeech.resume();
  }
}

window.Speech = Speech;

export default Speech;