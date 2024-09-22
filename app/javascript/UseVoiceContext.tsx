import { useContext } from "react";
import { VoiceContextType } from "./types";
import { VoiceContext } from "./VoiceProvider";

export function useVoiceContext(): VoiceContextType {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error("useVoiceContext must be used within a VoiceProvider");
  }
  return context as VoiceContextType;
}
