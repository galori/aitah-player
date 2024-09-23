import EasySpeech from "easy-speech";
import type EasySpeechType from "./types/easy-speech-extension";
import { Voice } from "./types";

interface SpeechInitProps {
  setVoice: (voice: Voice) => void;
  setCountries: (countries: Set<string>) => void;
  setVoicesByCountry: (voicesByCountry: { [key: string]: Set<Voice> }) => void;
}

class Speech {
  private countries: Set<string> = new Set();

  private voicesByCountry: { [key: string]: Set<Voice> } = {};

  private country: string | null = null;

  public async init({
    setVoice,
    setCountries,
    setVoicesByCountry,
  }: SpeechInitProps) {
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
      setCountries(this.countries);
      setVoicesByCountry(this.voicesByCountry);
    }
  }
}

export default Speech;
