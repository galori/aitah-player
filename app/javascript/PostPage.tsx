import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Post} from './types';
import {Container, Typography, Paper, AppBar, Toolbar, Box, Button} from '@mui/material';

import {} from "@mui/material";

function PostPage() {
  const {id} = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/posts/${id}.json`)
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
    <Box sx={{minHeight: '100vh', bgcolor: 'grey.100'}}>
      <AppBar position="static" className="bg-orange-500">
        <Toolbar>
          <Typography variant="h6" className="text-white">
            Title: {post.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} disableGutters sx={{my: 0, mx: 0, px: 0}}>
        <Paper sx={{width: '100%', boxShadow: 'none', px: 4, py: 2}}>
          {post.sentences.map((segment, index) => (
            <Typography key={index} paragraph dangerouslySetInnerHTML={{__html: segment}} />
          ))}
          <Button variant="contained" href="/">Home1</Button>
        </Paper>

      </Container>
    </Box>
  );
}

export default PostPage;