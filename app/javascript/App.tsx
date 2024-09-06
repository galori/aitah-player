import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsPage from './PostsPage';
import PostPage from './PostPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={< PostsPage />} />
          <Route path="/post/:id" element={< PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;