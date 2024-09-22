import React, {useEffect, useState} from "react";
import Speech from "./Speech";
import { useVoiceContext } from "./UseVoiceContext";

function SpeechCore() {

  const [initialized, setInitialized] = useState(false);
  const { voice, setVoice } = useVoiceContext();

  useEffect(() => {
    if (!initialized) {
      const init = async () => {
        await Speech.ready(setVoice);
        setInitialized(true);
      }
      init().catch(console.error);
    }

  }, [initialized, setInitialized]);
  return (<></>)
}