import React, {createContext, useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PostsPage from "./PostsPage";
import PostPage from "./PostPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VoiceSelector from "./VoiceSelector";
import { Voice } from "./types";
import { VoiceContext } from './VoiceProvider';

const theme = createTheme();

const App = () => {
  const defaultVoice:Voice = {name: 'none', lang: 'en-GB', localService: true, default: true, voiceURI: 'https://google.com'};

  const [voice, setVoice] = useState<Voice | null>(defaultVoice);

  return (
    <React.StrictMode>
      <VoiceContext.Provider value={{voice, setVoice}}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Router>
            <div>
              <Routes>
                <Route path="/" element={< PostsPage/>}/>
                <Route path="/post/:id" element={< PostPage/>}/>
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </VoiceContext.Provider>
    </React.StrictMode>
  );
}

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App/>, root);
});