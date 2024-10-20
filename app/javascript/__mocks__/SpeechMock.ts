import {Voice} from "../types";
import sleep from "../lib/sleep";

interface IMockCalls {
  speak: string[];
  pause: string[];
  resume: string[];
}

class SpeechMock {
  private static calls:IMockCalls = {speak: [], pause: [], resume: []};

  public static async speak({text, voice}: {text: string, voice: Voice}): Promise<void> {
    this.calls.speak.push(text);
    await sleep(2000);
  }

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
}

window.SpeechMock = SpeechMock;

export default SpeechMock;