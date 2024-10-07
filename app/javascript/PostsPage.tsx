import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListItemButton,
  Container,
  Typography,
  List,
  ListItemText,
  Paper,
  AppBar,
  Toolbar,
  Box,
} from '@mui/material';
import { Post } from './types';

function PostsPage({version}: {version: React.MutableRefObject<string | null>}) {
  const navigate = useNavigate();
  const [posts, setPost] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [alreadyFetched, setAlreadyFetched] = React.useState<boolean>(false);

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    if (alreadyFetched) return;
    fetch('api/posts.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    setAlreadyFetched(true);
  }, [setPost, setLoading, setError, alreadyFetched]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        Error:
        {error}
      </p>
    );
  }
  if (posts.length === 0) return <p>No posts found</p>;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      <AppBar position="static" className="bg-orange-500">
        <Toolbar>
          <Box sx={{ position: 'absolute', right: '3px', top: '3px' }}>v{version.current}</Box>
          <Box sx={{ position: 'absolute', left: '0px', top: '3px' }} id="top-label">-</Box>
          <Typography variant="h6" className="text-white">
            Reddit Top Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} disableGutters sx={{ my: 0, mx: 0, px: 0 }}>
        <Paper sx={{ width: '100%', boxShadow: 'none' }}>
          <List>
            {posts.map((post, index) => (
              <ListItemButton
                key={`post-${post.id}`}
                sx={{
                  py: 2,
                  borderBottom: index < posts.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.300',
                }}
                onClick={() => handlePostClick(post.id)}
              >
                <ListItemText
                  primary={(
                    <>
                      <Typography variant="subtitle1" component="span" className="font-semibold">
                        {post.title}
                      </Typography>
                      {' '}
                      <Typography variant="body2" component="span" color="text.secondary">
                        by /u/
                        {post.author}
                      </Typography>
                    </>
                  )}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}

export default PostsPage;
