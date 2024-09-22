import EasySpeech from "easy-speech";
import type EasySpeechType from "./types/easy-speech-extension";
import { Voice } from "./types";
import { useVoiceContext } from "./UseVoiceContext";

const { setVoice } = useVoiceContext();

class Speech {
  private static instance: Speech;

  private isReady: boolean = false;

  private countries: Set<string> = new Set();

  private voicesByCountry: { [key: string]: Set<Voice> } = {};

  private country: string | null = null;

  public ready: Promise<void>;

  private resolveReady!: () => void;

  private constructor() {
    this.ready = new Promise<void>((resolve) => {
      this.resolveReady = resolve;
    });
    this.init();
  }

  private async init() {
    this.initEasySpeech();
    this.isReady = true;
    this.resolveReady();
  }

  public static getInstance(): Speech {
    if (!Speech.instance) {
      Speech.instance = new Speech();
    }
    return Speech.instance;
  }

  private async initEasySpeech() {
    await EasySpeech.init({ maxTimeout: 1000, interval: 100 });

    const voicesFromAPI = await (
      EasySpeech as typeof EasySpeechType
    ).filterVoices({ language: "en" });

    voicesFromAPI.forEach((voice: Voice) => {
      const country = voice.lang.substring(3, 5);
      this.voicesByCountry[country] =
        this.voicesByCountry[country] || new Set();
      this.voicesByCountry[country].add(voice);
      this.countries.add(country);
    });

    this.country = this.countries.values().next().value;
    if (this.country) {
      const voice = this.voicesByCountry[this.country].values().next().value;
      setVoice(voice);
    }
  }
}

export default Speech.getInstance();
