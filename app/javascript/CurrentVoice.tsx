import React from 'react';
import { Button } from "@mui/material";
import { useVoiceContext } from "./UseVoiceContext";
import { useNavigate } from "react-router-dom";


function CurrentVoice({ onClick }: { onClick: () => void }) {
  const voiceContext = useVoiceContext();
  const { voice } = voiceContext;
  const navigate = useNavigate();

  return (
      <Button onClick={onClick}>Current voice: {voice?.name}</Button>
  );
}

export default CurrentVoice;