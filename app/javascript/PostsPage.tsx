import React from 'react';
import PostsList from './PostsList';

const PostsPage: React.FC = () => {

  const postsData = JSON.parse(document.getElementById('posts')!.getAttribute('data-posts')!);
  console.log(`postsData: ${JSON.stringify(postsData)}`);
  return (
    <div>
      <h1>Posts</h1>
      <PostsList posts={postsData} />
    </div>
  );
}

export default PostsPage;
