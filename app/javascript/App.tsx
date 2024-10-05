import React, {useState, useMemo, useRef, useEffect} from "react";
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
  const [country, setCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState(new Set<string>());
  const [voicesByCountry, setVoicesByCountry] = useState<{
    [key: string]: Set<Voice>;
  }>({});
  const [speechReady, setSpeechReady] = useState<boolean>(false);
  const version = useRef<string | null>(null);

  const voiceProviderValue = useMemo(
    () => ({ voice, setVoice, country, setCountry, countries, setCountries, voicesByCountry, setVoicesByCountry, speechReady, setSpeechReady }),
    [voice, setVoice, country, setCountry, countries, setCountries, voicesByCountry, setVoicesByCountry, speechReady, setSpeechReady],
  );

  useEffect(() => {
    if (!version.current) {
      version.current = new URLSearchParams(window.location.search).get('v');
    }

  }, [version]);

  return (
    <React.StrictMode>
      <VoiceContext.Provider value={voiceProviderValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<PostsPage version={version} />} />
                <Route path="/post/:id" element={<PostPage version={version} />} />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
        <SpeechCore />
      </VoiceContext.Provider>
    </React.StrictMode>
  );
}

const root = document.getElementById("root");

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, root);
});
