import {Voice} from "../types";
import sleep from "../lib/sleep";

interface IMockCalls {
  speak: string[];
  pause: string[];
  resume: string[];
}

class SpeechMock {
  private static calls:IMockCalls = {speak: [], pause: [], resume: []};

  private static isSpeaking: boolean = false;

  private static shouldFinishSpeakingImmediately: boolean = false;

  public static async speak({text, voice}: {text: string, voice: Voice}): Promise<void> {
    this.calls.speak.push(text);

    if (this.shouldFinishSpeakingImmediately) {
      return new Promise<void>((resolve) => {
        resolve();
      });
    }

    this.isSpeaking = true;

    return new Promise<void>((resolve) => {
      const waitForUtterance = async () => {
        if (this.isSpeaking) {
          setTimeout(waitForUtterance, 100);
        } else {
          resolve();
        }
      }
      waitForUtterance();
    });
  };

  public static async init(): Promise<void> {
    // do nothing
  }

  public static pause(): void {
    this.calls.pause.push('pause');
  }

  public static resume(): void {
    this.calls.resume.push('resume');
  }

  public static getCalls(name: "speak" | "pause" | "resume"): string[] {
    return this.calls[name];
  }

  public static async finishCurrentUtterance(callback: () => void) {
    this.isSpeaking = false;
    setTimeout(() => {
      callback();
    }, 300);
  }

  public static finishSpeakingImmediately(trueOrFalse: boolean): void {
    this.shouldFinishSpeakingImmediately = trueOrFalse;
  }
}

window.SpeechMock = SpeechMock;

export default SpeechMock;