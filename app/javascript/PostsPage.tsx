import React from 'react';
// import PostsList from './PostsList';
import { Post } from "./types";
import { Container, Typography, List, ListItem, ListItemText, Paper, AppBar, Toolbar } from '@mui/material';

function PostsPage() {
  const posts: Post[] = JSON.parse(document.getElementById('posts')!.getAttribute('data-posts')!);


  // t.string "author"
  // t.string "body"
  // t.string "title"
  // t.string "url"

  // const redditPosts = [
  //   { id: 1, title: "TIL that honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible." },
  //   { id: 2, title: "What's a random fact that lives in your head rent-free?" },
  //   { id: 3, title: "Scientists have successfully created a wormhole on a quantum computer" },
  //   { id: 4, title: "What's a life hack you think everyone should know?" },
  //   { id: 5, title: "Redditors who have been clinically dead and then resuscitated, what did you experience while dead?" }
  // ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" className="bg-orange-500">
        <Toolbar>
          <Typography variant="h6" className="text-white">
            Reddit Top Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="mt-8">
        <Paper className="p-4">
          <List>
            {posts.map((post) => (
              <ListItem key={post.id} className="mb-2">
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="font-semibold">
                      {post.title} by /u/{post.author}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </div>);
}

export default PostsPage;
