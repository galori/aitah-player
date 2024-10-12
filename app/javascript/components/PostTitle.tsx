import React from "react";
import {Typography} from "@mui/material";
import {Reddit} from "@mui/icons-material";
import {Link} from "react-router-dom";
import Sentence from "../Sentence";
import {Post} from "../types";

export interface IPostTitleProps {
  currentlyReading: number | null;
  post: Post;
}

function PostTitle({currentlyReading, post}: IPostTitleProps) {
  return (
    <>
      <Link to={post.url} target="_blank" rel="noreferrer">
        <Reddit sx={{float: 'right'}}/>
      </Link>
      <Typography variant="h6" className="text-white">
        <Sentence
          indexInParent={0}
          currentlyReading={currentlyReading}
          sentenceIndex={1}
        >
          <strong>{post.title}</strong> by {post.author} ({post.score} votes)
        </Sentence>
      </Typography>
    </>
  );
}

export default PostTitle;