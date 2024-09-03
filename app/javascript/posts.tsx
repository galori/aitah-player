import React from 'react';
import ReactDOM from 'react-dom';
import PostsPage from './PostsPage';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<PostsPage />, rootElement);
}

// const rootElement = document.getElementById('root');
// if (rootElement) {
//     ReactDOM.render(<h1>Hello, world!</h1>, rootElement);
// }