import React, { useMemo } from "react";
import { Voice } from "./types";

interface VoiceContextType {
  voice: Voice | null;
  setVoice: (voice: Voice) => void;
}

const VoiceContext = React.createContext<VoiceContextType | null>(null);

interface VoiceProviderProps {
  children: React.ReactNode;
}

function VoiceProvider({ children }: VoiceProviderProps) {
  const [voice, setVoice] = React.useState<Voice | null>(null);

  const oiceContextMemo = useMemo(
    () => ({ voice, setVoice }),
    [voice, setVoice],
  );
  return (
    <VoiceContext.Provider value={oiceContextMemo}>
      {children}
    </VoiceContext.Provider>
  );
}

export { VoiceContext, VoiceProvider };
