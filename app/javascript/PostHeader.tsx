import React from "react";
import { AppBar, Box, Paper, Toolbar } from "@mui/material";
import SpeechControls from "./SpeechControls";
import CurrentVoice from "./CurrentVoice";
import { Post } from "./types";

export interface PostHeaderProps {
  setCurrentlyReading: (index: number | null) => void;
  currentlyReading: number | null;
  post: Post | null;
  setShowVoiceSelector: (showVoiceSelector: boolean) => void;
  version: React.MutableRefObject<string | null>;
}

function PostHeader({
  setCurrentlyReading,
  currentlyReading,
  post,
  setShowVoiceSelector,
  version,
}: PostHeaderProps) {
  if (!post) return null;

  return (
    <>
      <AppBar
        position="static"
        className="bg-orange-500"
        sx={{ p: 1, position: "fixed" }}
      >
        <Toolbar sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ position: "absolute", right: "3px", top: "3px" }}>
            v{version.current ?? ""}
          </Box>
          <SpeechControls
            sx={{ px: 2, my: 1 }}
            setCurrentlyReading={setCurrentlyReading}
            currentlyReading={currentlyReading}
          />
          <Paper sx={{ mx: 2, px: 2, my: 0 }}>
            <CurrentVoice
              onClick={() => {
                setShowVoiceSelector(true);
              }}
            />
          </Paper>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default PostHeader;
