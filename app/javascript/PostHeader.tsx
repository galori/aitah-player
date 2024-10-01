import React from 'react';
import {AppBar, Paper, Toolbar, Typography} from "@mui/material";
import SpeechControls from "./SpeechControls";
import CurrentVoice from "./CurrentVoice";

export interface PostHeaderProps {
  setCurrentlyReading: ((index:number | null) => void);
  currentlyReading: number | null;
  title: string | null;
  setShowVoiceSelector: ((showVoiceSelector:boolean) => void);
}

function PostHeader({setCurrentlyReading, currentlyReading, title, setShowVoiceSelector} : PostHeaderProps) {
  return (
    <AppBar position="static" className="bg-orange-500">
      <Toolbar>
        <SpeechControls
          sx={{ px: 2 }}
          setCurrentlyReading={setCurrentlyReading}
          currentlyReading={currentlyReading}
        />
        <Typography variant="h6" className="text-white">
          Title: {title}
        </Typography>
        <Paper sx={{ mx: 2, px: 2 }}>
          <CurrentVoice
            onClick={() => {
              setShowVoiceSelector(true);
            }}
          />
        </Paper>
      </Toolbar>
    </AppBar>
  );
}

export default PostHeader;