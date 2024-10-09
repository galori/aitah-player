import { DEBUG } from "./initialize/config";

class iOS {
  static isWebView(): boolean {
    return !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.logHandler);
  }

  static speak(textToSpeak: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (iOS.isWebView()) {
        const handler = () => {
          window.removeEventListener("speech-done", handler);
          resolve(true);
        }
        window.addEventListener("speech-done", handler);
        if (DEBUG) console.log('speak: ', textToSpeak);
        window.webkit.messageHandlers.speakHandler.postMessage(textToSpeak);
      }
    });
  }

  static pause(): void {
    if (DEBUG) console.log('pause');
    if (iOS.isWebView()) {
      window.webkit.messageHandlers.pauseHandler.postMessage('pause');
    }
  }

  static continue(): void {
    if (DEBUG) console.log('continue');
    if (iOS.isWebView()) {
      window.webkit.messageHandlers.speechHandler.postMessage('continue');
    }
  }

  static stop(): void {
    if (DEBUG) console.log('stop');
    if (iOS.isWebView()) {
      window.webkit.messageHandlers.speechHandler.postMessage('stop');
    }
  }
}

export default iOS;