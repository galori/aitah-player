import React from 'react';
import PostsList from './PostsList';

const PostsPage: React.FC = () => {

  const posts = JSON.parse(document.getElementById('posts')!.getAttribute('data-posts')!);
  return (
    <div>
      <h1>Posts</h1>
      <PostsList posts={posts} />
    </div>
  );
}

export default PostsPage;
