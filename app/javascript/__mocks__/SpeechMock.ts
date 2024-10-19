import {Voice} from "../types";

class SpeechMock {
  private static calls: string[] = [];

  public static async speak({text, voice}: {text: string, voice: Voice}): Promise<void> {
    this.calls.push(text);
  }

  public static async init(): Promise<void> {
    this.calls = [];
  }

  public static pause(): void {}

  public static resume(): void {}

  public static getCalls(): string[] {
    return this.calls;
  }
}

if (process.env.APP_ENV == 'test') {
  (window as any).SpeechMock = SpeechMock;
}

export default SpeechMock;