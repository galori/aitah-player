import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Paper } from "@mui/material";
import useVoiceContext from "./UseVoiceContext";
import { Voice, Countries, VoicesByCountry } from "./types";

function VoiceSelector({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [countries] = useState<Countries>(new Set());
  const [country, setCountry] = useState<string | null>(null);
  const [voicesByCountry] = useState<VoicesByCountry>({});
  const [loading] = useState(true);

  const { voice, setVoice } = useVoiceContext();
  const prevCountryRef = useRef<string | null>(null);

  useEffect(() => {
    if (country !== prevCountryRef.current && country !== null) {
      const firstVoiceInCountry = voicesByCountry[country]
        .values()
        .next().value;
      setVoice(firstVoiceInCountry);
    }
  }, [country, voicesByCountry, setVoice]);


  const handleClick = (newVoice: Voice) => {
    setVoice(newVoice);
    onClose();
  };

  if (loading && visible) return <p>Loading...</p>;

  return (
    <Box sx={{ display: visible ? "block" : "none" }}>
      <Paper>
        {[...countries].map((eachCountry, index) => (
          <Button
            key={`${eachCountry}-${String(index)}`}
            onClick={() => setCountry(eachCountry)}
          >
            {eachCountry}
          </Button>
        ))}
      </Paper>
      <Paper>
        {country != null &&
          [...voicesByCountry[country]].map((eachVoice, index) =>
            eachVoice.name === voice?.name ? (
              <strong>{eachVoice.name} (selected)</strong>
            ) : (
              <Button
                key={`${eachVoice.name}-${String(index)}`}
                onClick={() => handleClick(eachVoice)}
              >
                {eachVoice.name}
              </Button>
            ),
          )}
      </Paper>
    </Box>
  );
}

export default VoiceSelector;
