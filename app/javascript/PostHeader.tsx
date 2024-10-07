import React from "react";
import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import SpeechControls from "./SpeechControls";
import CurrentVoice from "./CurrentVoice";
import { Post } from "./types";
import Sentence from "./Sentence";

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
      <Paper sx={{ m: 1, px: 1, mt: 0, paddingTop: "129px" }}>
        <Typography variant="h6" className="text-white">
          <Sentence
            indexInParent={0}
            currentlyReading={currentlyReading}
            sentenceIndex={1}
          >
            <strong>{post.title}</strong> by {post.author} ({post.score} votes)
          </Sentence>
        </Typography>
      </Paper>
    </>
  );
}

export default PostHeader;
