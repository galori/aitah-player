import {Button, Paper, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import Sentence from "./Sentence";
import {Post} from "./types";
import FetchPost from "./fetch/FetchPost";

export interface PostPageProps {
  postId: string;
  currentlyReading: number | null;
  setTitle: (title: string) => void;
}

function PostBody({postId, currentlyReading, setTitle}: PostPageProps) {

  const [loading, setLoading] = useState(true);
  const [alreadyFetched, setAlreadyFetched] = useState<boolean>(false);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const prevPostRef = useRef<Post | null>(null);

  useEffect(() => {
    if (alreadyFetched || !postId) return;
    const performFetch = async () => {
      await new FetchPost(postId, setPost).fetch();
      setLoading(false);
      setAlreadyFetched(true);
    }
    performFetch().catch(console.error);
  }, [postId, setPost, setLoading, alreadyFetched, post, setTitle]);

  useEffect(() => {
    if (post) {
      if (prevPostRef.current !== post) {
        setTitle(post.title);
      }
      prevPostRef.current = post;
    }
  }, [post, setTitle]);


  if (loading) return <p>Loading...</p>;
  if (!post) return <p>No post found</p>;

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
            index={index}
            currentlyReading={currentlyReading === index}
          >
            {sentence}
          </Sentence>
        ))}
      </Typography>
      <Button variant="contained" href="/" sx={{mt: 2}}>
        Home
      </Button>
    </Paper>
  )
}

export default PostBody;