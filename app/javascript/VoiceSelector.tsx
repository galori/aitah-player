import React, {useState, useEffect, useRef} from "react";
import {Box, Button, Container, Paper, ToggleButton, ToggleButtonGroup} from "@mui/material";
import countryCodeToFlagEmoji from "country-code-to-flag-emoji";
import useVoiceContext from "./UseVoiceContext";
import {Voice} from "./types";

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
                <Paper sx={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    py: 2
                }}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <ToggleButtonGroup value={country} exclusive sx={{height: 'fit-content', display: 'flex'}}>
                            {[...countries].map((eachCountry) => {
                                console.log('eachCountry:', eachCountry);
                                return (
                                    <ToggleButton value={eachCountry} onClick={() => setCountry(eachCountry)}
                                                  key={eachCountry} sx={{fontSize: '3rem', color: 'white', px: 3}}>
                                        {countryCodeToFlagEmoji(eachCountry)}
                                    </ToggleButton>
                                );
                            })}
                        </ToggleButtonGroup>
                    </Box>
                </Paper>
                <Paper>
                    {country != null &&
                        [...voicesByCountry[country]].map((eachVoice, index) =>
                            eachVoice.name === voice?.name ? (
                                <strong key={eachVoice.name}>{eachVoice.name} (selected)</strong>
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
