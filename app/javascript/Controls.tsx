import React from "react";
import SpeechControls from "./SpeechControls";
import {Post} from "./types";

export interface PostHeaderProps {
  setCurrentlyReading: (index: number | null) => void;
  currentlyReading: number | null;
  post: Post | null;
}

function Controls({
                    setCurrentlyReading,
                    currentlyReading,
                    post,
                  }: PostHeaderProps) {
  if (!post) return null;

  return (
    <SpeechControls
        sx={{px: 2, my: 1}}
        setCurrentlyReading={setCurrentlyReading}
        currentlyReading={currentlyReading}
      />
  );
}

export default Controls;
