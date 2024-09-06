import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsPage from './PostsPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={< PostsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;