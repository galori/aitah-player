import EasySpeech from "easy-speech";

class IOSBridge {
  // public static callNativeFunction(name: string, data: any) {
  //     window.webkit.messageHandlers[name].postMessage(data);
  // }

  static setup() {
    window.nativeEvent = (name: string) => {
      const event = new Event(name);
      window.dispatchEvent(event);
    }
    window.EasySpeech = EasySpeech;
  }
}

export default IOSBridge;
