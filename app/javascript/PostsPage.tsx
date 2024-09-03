import React from 'react';
import PostsList from './PostsList';

const PostsPage: React.FC = () => {
  const posts = [
    { id: 1, title: 'Hello, world!' },
    { id: 2, title: 'Hello, React!' },
  ];

  return (
    <div>
      <h1>Posts</h1>
      <PostsList posts={posts} />
    </div>
  );
}

export default PostsPage;

import ReactDOM from 'react-dom';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<h1>Hello, world!</h1>, rootElement);
}