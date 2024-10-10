import React, {useState, useEffect, useRef} from "react";
import {Box, Chip, Fab, ToggleButtonGroup, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import countryCodeToFlagEmoji from "country-code-to-flag-emoji";
import useVoiceContext from "./UseVoiceContext";
import {Voice} from "./types";
import StyledFlagToggleButton from "./styled-components/StyledFlagToggleButton";
import StyledPaperVoiceSelector from "./styled-components/StyledPaperVoiceSelector";
import StyledBoxVoiceSelector from "./styled-components/StyledBoxVoiceSelector";
import iOS from "./iOS";

class IOSDefaultVoice implements Voice {
  name: string = "iOS Default Voice";

  lang: string = "en-US";

  localService: boolean = false;

  default: boolean = true;

  voiceURI: string = "iOS Default Voice";
}

function VoiceSelector({visible, onClose,}: { visible: boolean; onClose: () => void; }) {
  const [loading, setLoading] = useState(true);

  const {voice, setVoice, country, setCountry, countries, voicesByCountry, speechReady} = useVoiceContext();
  const prevCountryRef = useRef<string | null>(null);

  useEffect(() => {
    if (speechReady) {
      if (iOS.isWebView()) {
        const iOSVoice:Voice = new IOSDefaultVoice();
        setVoice(iOSVoice);
      }
      if (country !== prevCountryRef.current && country !== null) {
        const firstVoiceInCountry = voicesByCountry[country]
          .values()
          .next().value;
        setVoice(firstVoiceInCountry);
        prevCountryRef.current = country;
      }
    }
  }, [country, voicesByCountry, setVoice, speechReady]);

  useEffect(() => {
    if (speechReady && loading && voicesByCountry && countries) {
      setLoading(false);
    }
  }, [voicesByCountry, countries, loading, speechReady]);

  const handleClick = (newVoice: Voice) => {
    setVoice(newVoice);
  };

  if (!speechReady || loading) return <p>Loading...</p>;

  const numberOfVoices = country ? voicesByCountry[country]?.size : 0;

  return (
    <StyledPaperVoiceSelector sx={{display: visible ? "flex" : "none", m: 1}} data-is-visible={visible}>
      <Fab color="secondary" aria-label="add" sx={{m: 2, float: 'left'}}>
        <Typography variant="body2" onClick={onClose}>CLOSE</Typography>
      </Fab>

      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <ToggleButtonGroup value={country}
                           exclusive
                           sx={{height: 'fit-content', display: 'flex', flexGrow: 1, width: '80%', mx: 1}}
        >
          {[...countries].map((eachCountry) => (
            <StyledFlagToggleButton value={eachCountry} onClick={() => setCountry(eachCountry)}
                                    key={eachCountry}>
              {countryCodeToFlagEmoji(eachCountry)}
            </StyledFlagToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <StyledBoxVoiceSelector>
        <Grid container spacing={5} sx={{my: 2}}>
          {country != null &&
            [...voicesByCountry[country]].map((eachVoice, index) => {
              const selected = eachVoice.name === voice?.name;
              return (
                <Grid size={numberOfVoices === 1 ? 12 : 6} sx={{display: 'flex', justifyContent: 'center'}}
                      key={`${eachVoice.name}-${String(index)}`}>
                  <Chip
                    onClick={() => (!selected && handleClick(eachVoice))}
                    label={
                      <Typography variant="body1" color="textPrimary">
                        {eachVoice.name}
                      </Typography>
                    } variant={selected ? "filled" : "outlined"} sx={{my: 1}}
                  />
                </Grid>
              )
            })}
        </Grid>
      </StyledBoxVoiceSelector>
    </StyledPaperVoiceSelector>
  );
}

export default VoiceSelector;
