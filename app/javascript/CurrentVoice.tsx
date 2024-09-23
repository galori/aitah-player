import React from "react";
import { Button } from "@mui/material";
import useVoiceContext from "./UseVoiceContext";

function CurrentVoice({ onClick }: { onClick: () => void }) {
  const { voice } = useVoiceContext();

  return (
    <Button onClick={onClick}>
      Current voice:
      {voice?.name}
    </Button>
  );
}

export default CurrentVoice;
