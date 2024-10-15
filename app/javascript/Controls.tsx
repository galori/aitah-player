import React from "react";
import SpeechControls from "./SpeechControls";
import {Post, EasySpeechState } from "./types";

export interface PostHeaderProps {
  setCurrentlyReading: (index: number | null) => void;
  currentlyReading: number | null;
  post: Post | null;
  easySpeechState: EasySpeechState;
  setEasySpeechState: (state: EasySpeechState) => void;

}

function Controls({
                    setCurrentlyReading,
                    currentlyReading,
                    post,
                    easySpeechState,
                    setEasySpeechState,
                  }: PostHeaderProps) {
  if (!post) return null;

  return (
    <SpeechControls
        sx={{px: 2, my: 1}}
        setCurrentlyReading={setCurrentlyReading}
        currentlyReading={currentlyReading}
        easySpeechState={easySpeechState}
        setEasySpeechState={setEasySpeechState}

    />
  );
}

export default Controls;
