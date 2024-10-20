import React from 'react';
import PostRow from './PostRow';
import { Post } from './types';

function PostsList({ posts }: { posts: Post[] }) {
  return (
    <ul id="posts" role="list">
      {posts.map((post) => (
        <PostRow key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default PostsList;