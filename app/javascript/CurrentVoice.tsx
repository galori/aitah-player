import React from "react";
import {Button, Chip} from "@mui/material";
import useVoiceContext from "./UseVoiceContext";

function CurrentVoice({ onClick }: { onClick: () => void }) {
  const { voice } = useVoiceContext();

  return (
    <Button onClick={onClick}>
      Voice:
      <Chip label={voice?.name} sx={{px: 1,mx: 2, backgroundColor: '#104e8a', color: 'white'}} />
    </Button>
  );
}

export default CurrentVoice;
