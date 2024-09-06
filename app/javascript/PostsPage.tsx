import React from 'react';
import PostsList from './PostsList';
import { Post } from "./types";

function PostsPage() {
  const posts: Post[] = JSON.parse(document.getElementById('posts')!.getAttribute('data-posts')!);

  return (
    <div>
      <h1>Posts</h1>
      <PostsList posts={posts} />
    </div>
  );
}

export default PostsPage;
