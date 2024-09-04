import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsPage from './PostsPage';
import PostPage from './PostPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={PostsPage} />
        <Route path="/post/:id" element={PostPage} />
      </Routes>
    </Router>
  );
}

export default App;

