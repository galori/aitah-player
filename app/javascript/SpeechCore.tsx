import { useEffect, useState } from "react";
import Speech from "./speech";
import useVoiceContext from "./UseVoiceContext";

function SpeechCore() {
  const [initialized, setInitialized] = useState(false);
  const voiceContext = useVoiceContext();

  useEffect(() => {
    if (!initialized) {
      const init = async () => {
        const speech = new Speech();
        await speech.init({ voiceContext });
      };
      init().catch(console.error);
    }
    setInitialized(true);
  }, [initialized, setInitialized, voiceContext]);

  return null;
}

export default SpeechCore;
