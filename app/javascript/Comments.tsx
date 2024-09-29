import React from 'react';
import {Paper} from "@mui/material";
import {Post} from "./types";

export interface CommentsProps {
  post: Post;
  currentlyReading: number | null;
}

function Comments({post, currentlyReading}: CommentsProps) {
  return (
    <Paper sx={{width: "100%", boxShadow: "none", px: 4, py: 2}}>
      <div>
        <h1>Comments for {post.title} Currently reading: {currentlyReading}</h1>
      </div>
      );
    </Paper>
  )
}

export default Comments;
