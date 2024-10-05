import React from 'react';
import {AppBar, Paper, Toolbar, Typography} from "@mui/material";
import SpeechControls from "./SpeechControls";
import CurrentVoice from "./CurrentVoice";

export interface PostHeaderProps {
  setCurrentlyReading: ((index:number | null) => void);
  currentlyReading: number | null;
  title: string | undefined;
  setShowVoiceSelector: ((showVoiceSelector:boolean) => void);
}

function PostHeader({setCurrentlyReading, currentlyReading, title, setShowVoiceSelector} : PostHeaderProps) {
  return (
    <>
    <AppBar position="static" className="bg-orange-500" sx={{p: 1, position: 'fixed'}}>
      <Toolbar sx={{ display: 'flex', flexDirection: 'column'}}>
        <SpeechControls
          sx={{ px: 2, my: 1 }}
          setCurrentlyReading={setCurrentlyReading}
          currentlyReading={currentlyReading}
        />
        <Paper sx={{ mx: 2, px: 2, my: 0}} data-is-the-paper="yes">
          <CurrentVoice
            onClick={() => {
              setShowVoiceSelector(true);
            }}
          />
        </Paper>
      </Toolbar>
    </AppBar>
    <Paper sx={{m: 1, px: 1, mt: 0, paddingTop: '129px'}}>
      <Typography variant="h6" className="text-white">{title}</Typography>
    </Paper>
    </>
  );
}

export default PostHeader;