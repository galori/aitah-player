import React from 'react';
import { Voice } from './types';

interface VoiceContextType {
  voice: Voice | null;
  setVoice: (voice: Voice) => void;
}

const VoiceContext = React.createContext<VoiceContextType | null>(null);

interface VoiceProviderProps {
  children: React.ReactNode;
}

const VoiceProvider = ({ children } : VoiceProviderProps ) => {

  const [voice, setVoice] = React.useState<Voice | null>(null);

  return (
    <VoiceContext.Provider value={{ voice, setVoice }}>
      {children}
    </VoiceContext.Provider>
  );
}

export { VoiceContext, VoiceProvider };