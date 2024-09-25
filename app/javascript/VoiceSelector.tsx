import React, { useState, useEffect, useRef } from "react";
import {Box, Button, Container, Paper, ToggleButton, ToggleButtonGroup} from "@mui/material";
import countryCodeToFlagEmoji from "country-code-to-flag-emoji";
import useVoiceContext from "./UseVoiceContext";
import { Voice } from "./types";

function VoiceSelector({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { voice, setVoice, countries, voicesByCountry } = useVoiceContext();
  const prevCountryRef = useRef<string | null>(null);

  useEffect(() => {
    if (country !== prevCountryRef.current && country !== null) {
      const firstVoiceInCountry = voicesByCountry[country]
        .values()
        .next().value;
      setVoice(firstVoiceInCountry);
    }
  }, [country, voicesByCountry, setVoice]);

  useEffect(() => {
    if (loading && voicesByCountry && countries) {
      setLoading(false);
    }
  }, [voicesByCountry, countries, loading]);

  const handleClick = (newVoice: Voice) => {
    setVoice(newVoice);
    onClose();
  };

  console.log(
    "VoiceSelector.tsx : VoiceSelector(). visible:",
    visible,
    "loading:",
    loading,
  );

  if (loading && visible) return <p>Loading...</p>;

  return (
    <Container>
      <Box sx={{ display: visible ? "block" : "none" }}>
        <Paper>
          {[...countries].map((eachCountry) => (
            <ToggleButtonGroup value={country} exclusive>
                <ToggleButton value={eachCountry} onClick={() => setCountry(eachCountry)} key={eachCountry}>
                    {countryCodeToFlagEmoji(eachCountry)}
                </ToggleButton>
              </ToggleButtonGroup>
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
    </Container>
  );
}

export default VoiceSelector;
