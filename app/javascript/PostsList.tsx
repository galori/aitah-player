import React from 'react';
import PostRow from './PostRow';

interface Post {
  id: number;
  title: string;
}

interface PostListProps {
  posts: Post[];
}

const PostsList: React.FC<PostListProps> = ({posts}) => {
  return (
    <ul id="posts" role="list">
      {posts.map((post: { id: React.Key; title: string; }) => (
        <PostRow key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default PostsList;