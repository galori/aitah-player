import EasySpeech from "easy-speech";
import _ from 'lodash';
import type EasySpeechType from "./types/easy-speech-extension";
import {Voice} from "./types";
import {VoiceContextType} from "./UseVoiceContext";

interface SpeechInitProps {
  voiceContext: VoiceContextType;
}

class Speech {
  private countries: Set<string> = new Set();

  private country: string | null = null;

  private voicesByCountry: { [key: string]: Set<Voice> } = {};

  public async init({voiceContext}: SpeechInitProps) {
    await EasySpeech.init({maxTimeout: 1000, interval: 100});

    const {setCountry, setVoice, setCountries, setVoicesByCountry, setSpeechReady} =
      voiceContext;
    const voicesFromAPI = await (
      EasySpeech as typeof EasySpeechType
    ).filterVoices({language: "en"});

    voicesFromAPI.forEach((voice: Voice) => {
      const country = voice.lang.substring(3, 5);
      this.voicesByCountry[country] =
        this.voicesByCountry[country] || new Set();

      this.addVoice(voice, country);

      this.countries.add(country);
    });

    this.country = this.countries.values().next().value;
    if (this.country) {
      setCountry(this.country);
      const voice = this.voicesByCountry[this.country].values().next().value;
      setVoice(voice);
      setCountries(this.countries);
      setVoicesByCountry(this.voicesByCountry);
      setSpeechReady(true);
    }
  }

  private addVoice(voice: Voice, country: string) {
    const voiceArray = _.toArray(this.voicesByCountry[country]);
    if (!_.find(voiceArray, {voiceURI: voice.voiceURI})) {
      this.voicesByCountry[country].add(voice);
    }
  }

}

export default Speech;
