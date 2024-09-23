import { useContext } from "react";
import { Voice } from "./types";
import { VoiceContext } from "./VoiceProvider";

export interface VoiceContextType {
  voice: Voice | null;
  setVoice: (voice: Voice) => void;
  countries: Set<string>;
  voicesByCountry: { [key: string]: Set<Voice> };
}

function useVoiceContext(): VoiceContextType {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error("useVoiceContext must be used within a VoiceProvider");
  }
  return context as VoiceContextType;
}

export default useVoiceContext;
