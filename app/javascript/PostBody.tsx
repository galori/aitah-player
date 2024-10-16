import {Box, Button, Paper, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Sentence from "./Sentence";
import {Post} from "./types";
import FetchPost from "./fetch/FetchPost";

export interface IPostPageProps {
  postId: string;
  currentlyReading: number | null;
  post: Post | null;
  setPost: (post:Post) => void;
}

function PostBody({postId, currentlyReading, post, setPost}: IPostPageProps) {

  const [loading, setLoading] = useState(true);
  const [alreadyFetched, setAlreadyFetched] = useState<boolean>(false);
  const prevPostRef = useRef<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (alreadyFetched || !postId) return;
    const performFetch = async () => {
      await new FetchPost(postId, setPost).fetch();
      setLoading(false);
      setAlreadyFetched(true);
    }
    performFetch().catch(console.error);
  }, [postId, setPost, setLoading, alreadyFetched, post]);

  useEffect(() => {
    if (post) {
      if (prevPostRef.current !== post) {
        setPost(post);
      }
      prevPostRef.current = post;
    }
  }, [post, setPost]);


  if (loading) return <p>Loading...</p>;
  if (!post) return <p>No post found</p>;

  return (
    <Box sx={{ color: 'white' }}>
      <Typography component="span" sx={{px: 0.2, display: "block"}}>
        {post.sentences.map((sentence, index) => {
          const sentenceIndex = index + 2; // 1 is the title + author
          return (
          <Sentence
            key={`sentence-${sentenceIndex}`} // eslint-disable-line react/no-array-index-key
            indexInParent={index}
            currentlyReading={currentlyReading}
            sentenceIndex={sentenceIndex}
          >
            {sentence}. 
          </Sentence>
        )})}
      </Typography>
    </Box>
  )
}

export default PostBody;