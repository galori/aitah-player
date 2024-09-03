import React from 'react';
import { Post } from './types';

const PostRow: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <li role="listitem">
      <a href={`/posts/${post.id}`}>{post.title}</a>
    </li>
  );
}

export default PostRow;