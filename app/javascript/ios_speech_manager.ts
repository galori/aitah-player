class IosSpeechManager {
  private isSpeaking: boolean = false;
  private isSpeakRequested: boolean = false;
  private isPaused: boolean = false;

  constructor() {
    window.addEventListener("speech-done", () => {
      this.isSpeaking = false;
    });
  }

  public async speak(text: string) {
    if (this.isSpeaking) {
      await this.stop();
    }
    this.isSpeaking = true;
    this.nativeSpeak(text);
  }

  public pause() {
    if (this.isSpeaking) {
      this.nativePause();
      this.isPaused = true;
    }
  }
  public continue() {

  }
  public async stop() {
    return new Promise((resolve) => {
      const handler = async () => {
        if (this.isSpeaking) {
          this.nativeStop();
          setTimeout(handler, 100);
        } else {
          resolve(true);
        }
      }
      handler();
    });
  }

  private nativeSpeak(text: string) {
    window.webkit.messageHandlers.speakHandler.postMessage(text);
  }

  private nativePause() {
    window.webkit.messageHandlers.pauseHandler.postMessage('pause');
    this.isSpeaking = false;
    this.isPaused = true;
  }

  private nativeStop() {
    window.webkit.messageHandlers.speechHandler.postMessage('stop');
  }
}