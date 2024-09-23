import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostsPage from "./PostsPage";
import PostPage from "./PostPage";
import { Voice } from "./types";
import { VoiceContext } from "./VoiceProvider";
import SpeechCore from "./SpeechCore";

const theme = createTheme();

function App() {
  const defaultVoice: Voice = {
    name: "none",
    lang: "en-GB",
    localService: true,
    default: true,
    voiceURI: "https://google.com",
  };

  const [voice, setVoice] = useState<Voice | null>(defaultVoice);
  const [countries, setCountries] = useState(new Set<string>());
  const [voicesByCountry, setVoicesByCountry] = useState<{
    [key: string]: Set<Voice>;
  }>({});

  const voiceProviderValue = useMemo(
    () => ({ voice, setVoice, countries, voicesByCountry }),
    [voice, setVoice, countries, voicesByCountry],
  );

  return (
    <React.StrictMode>
      <VoiceContext.Provider value={voiceProviderValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<PostsPage />} />
                <Route path="/post/:id" element={<PostPage />} />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
        <SpeechCore
          setCountries={setCountries}
          setVoicesByCountry={setVoicesByCountry}
        />
      </VoiceContext.Provider>
    </React.StrictMode>
  );
}

const root = document.getElementById("root");

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, root);
});
