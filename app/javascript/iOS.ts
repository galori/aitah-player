class iOS {
  static isWebView(): boolean {
    return !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.logHandler);
  }

  static speak(textToSpeak: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (iOS.isWebView()) {
        window.addEventListener("speech-done", (e) => {
          console.log('received speech-done event: ',e);
          resolve(true);
        });
        window.webkit.messageHandlers.speakHandler.postMessage(textToSpeak);
      }
    });
  }

  static pause(): void {
    if (iOS.isWebView()) {
      window.webkit.messageHandlers.pauseHandler.postMessage('pause');
    }
  }

  static continue(): void {
    if (iOS.isWebView()) {
      window.webkit.messageHandlers.speechHandler.postMessage('continue');
    }
  }

  static stop(): void {
    if (iOS.isWebView()) {
      window.webkit.messageHandlers.speechHandler.postMessage('stop');
    }
  }
}

export default iOS;