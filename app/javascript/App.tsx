import React from 'react';
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

const theme = createTheme();

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={< PostsPage />}/>
              <Route path="/post/:id" element={< PostPage/>}/>
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </React.StrictMode>,
    root
  );
});