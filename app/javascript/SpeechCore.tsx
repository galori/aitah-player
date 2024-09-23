import { useEffect, useState } from "react";
import Speech from "./speech";
import useVoiceContext from "./UseVoiceContext";
import { Voice } from "./types";

interface SpeechCoreProps {
  setCountries: (countries: Set<string>) => void;
  setVoicesByCountry: (voicesByCountry: { [key: string]: Set<Voice> }) => void;
}

function SpeechCore({ setCountries, setVoicesByCountry }: SpeechCoreProps) {
  const [initialized, setInitialized] = useState(false);
  const { setVoice } = useVoiceContext();

  useEffect(() => {
    if (!initialized) {
      const init = async () => {
        const speech = new Speech();
        await speech.init({ setVoice, setCountries, setVoicesByCountry });
      };
      init().catch(console.error);
    }
    setInitialized(true);
  }, [initialized, setInitialized, setVoice, setCountries, setVoicesByCountry]);

  return null;
}

export default SpeechCore;
