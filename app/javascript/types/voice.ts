export type Voice = SpeechSynthesisVoice;
export type VoicesByCountry = { [key: string]: Set<Voice> };
export type Countries = Set<string>;

export interface VoiceContextType {
  voice: Voice | null;
  setVoice: (voice: Voice) => void;
}