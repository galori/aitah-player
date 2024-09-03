import React from 'react';
import PostRow from './PostRow';
import { Post } from './types';

interface PostListProps {
  posts: Post[];
}

const PostsList: React.FC<PostListProps> = ({posts}) => {
  return (
    <ul id="posts" role="list">
      {posts.map((post) => (
        <PostRow key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default PostsList;