import {Button, Paper, Typography} from "@mui/material";
import React from "react";
import Sentence from "./Sentence";
import {Post} from "./types";

export interface PostPageProps {
  post: Post;
  currentlyReading: number | null;
}

function PostPage({post, currentlyReading}: PostPageProps) {
  return (
    <Paper
      sx={{
        width: "100%",
        boxShadow: "none",
        px: 4,
        py: 2,
      }}
    >
      <Typography component="span" sx={{px: 0.2, display: "block"}}>
        {post.sentences.map((sentence, index) => (
          <Sentence
            key={`sentence-${index}`} // eslint-disable-line react/no-array-index-key
            text={sentence}
            index={index}
            currentlyReading={currentlyReading === index}
          />
        ))}
      </Typography>
      <Button variant="contained" href="/" sx={{mt: 2}}>
        Home
      </Button>
    </Paper>
  )
}

export default PostPage;