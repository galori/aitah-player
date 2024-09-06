import React from 'react';
import { Post } from './types';
import { Link } from 'react-router-dom';

const PostRow: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <li role="listitem">
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  );
}

export default PostRow;