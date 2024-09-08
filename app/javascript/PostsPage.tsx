import React from 'react';
// import PostsList from './PostsList';
import {Post} from "./types";
import {
  ListItemButton,
  Divider,
  Container,
  Typography,
  List,
  ListItemText,
  Paper,
  AppBar,
  Toolbar,
  Box
} from '@mui/material';

function PostsPage() {
  const posts: Post[] = JSON.parse(document.getElementById('posts')!.getAttribute('data-posts')!);

  return (
    <Box sx={{minHeight: '100vh', bgcolor: 'grey.100'}}>
      <AppBar position="static" className="bg-orange-500">
        <Toolbar>
          <Typography variant="h6" className="text-white">
            Reddit Top Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} disableGutters sx={{mt: 2, mx: 0, px: 0}}>
        <Paper sx={{width: '100%', boxShadow: 'none'}}>
          <List>
            {posts.map((post, index) => (
              <>
                <ListItemButton key={post.id} sx={{
                  py: 2,
                  borderBottom: index < posts.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.300',
                }}>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant="subtitle1" component="span" className="font-semibold">
                          {post.title}
                        </Typography>
                        {' '}
                        <Typography variant="body2" component="span" color="text.secondary">
                          by /u/{post.author}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>);
}

export default PostsPage;
