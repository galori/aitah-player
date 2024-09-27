import React, {useState, useEffect, useRef} from "react";
import {Box, Chip, Container, ToggleButtonGroup, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import countryCodeToFlagEmoji from "country-code-to-flag-emoji";
import useVoiceContext from "./UseVoiceContext";
import {Voice} from "./types";
import StyledToggleButtonFlags from "./styled-components/StyledToggleButtonFlags";
import StyledPaperVoiceSelector from "./styled-components/StyledPaperVoiceSelector";

function VoiceSelector({visible, onClose,}: { visible: boolean; onClose: () => void; }) {
  const [loading, setLoading] = useState(true);

  const {voice, setVoice, country, setCountry, countries, voicesByCountry} = useVoiceContext();
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
      <Box sx={{display: visible ? "block" : "none"}}>
        <StyledPaperVoiceSelector>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <ToggleButtonGroup value={country} exclusive sx={{height: 'fit-content', display: 'flex'}}>
              {[...countries].map((eachCountry) => {
                console.log('eachCountry:', eachCountry);
                return (
                  <StyledToggleButtonFlags value={eachCountry} onClick={() => setCountry(eachCountry)}
                                           key={eachCountry}>
                    {countryCodeToFlagEmoji(eachCountry)}
                  </StyledToggleButtonFlags>
                );
              })}
            </ToggleButtonGroup>
          </Box>
          <Box sx={{py: 2, display: 'flex', flexDirection: 'column'}}>
            <Grid container spacing={3}>
              {country != null &&
                [...voicesByCountry[country]].map((eachVoice, index) =>
                  <Grid size={6} sx={{display: 'flex', justifyContent: 'center'}}>
                    {eachVoice.name === voice?.name ? (
                      <Chip key={eachVoice.name} label={
                        <Typography variant="body1" color="textPrimary">
                          {eachVoice.name}
                        </Typography>
                      } sx={{my: 2}}/>
                    ) : (
                      <Chip
                        key={`${eachVoice.name}-${String(index)}`}
                        onClick={() => handleClick(eachVoice)}
                        label={
                          <Typography variant="body1" color="textPrimary">
                            {eachVoice.name}
                          </Typography>
                        } variant="outlined" sx={{my: 2}}/>
                    )}
                  </Grid>
                )}
            </Grid>
          </Box>
        </StyledPaperVoiceSelector>

      </Box>
    </Container>
  );
}

export default VoiceSelector;
