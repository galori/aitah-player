import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from './types';
import Button from '@mui/material/Button';

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/posts/${id}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        return response.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <Button variant="contained" href="/">Home1</Button>
    </div>
  );
}

export default PostPage;