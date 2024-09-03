import React from 'react';
import { Post } from './types';

const PostRow: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <li role="listitem">
      {post.title}
    </li>
  );
}

export default PostRow;