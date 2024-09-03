import React from 'react';

const PostRow: React.FC<{ post: { id: React.Key; title: string; } }> = ({ post }) => {
  return (
    <li role="listitem">
      {post.title}
    </li>
  );
}

export default PostRow;