import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Box
} from "@mui/material";
import { Post } from "./types";
import SpeechControls from "./SpeechControls";
import CurrentVoice from "./CurrentVoice";
import VoiceSelector from "./VoiceSelector";
import PostBody from "./PostBody";
import Comments from "./Comments";

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentlyReading, setCurrentlyReading] = useState<number | null>(null);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [alreadyFetched, setAlreadyFetched] = useState<boolean>(false);

  useEffect(() => {
    if (alreadyFetched) return;
    fetch(`/api/posts/${id}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post");
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
  }, [id, setPost, setLoading, setError, alreadyFetched]);

  if (loading) return <p>Loading...</p>;
  if (error) return (<p>Error:{error}</p>);
  if (!post) return <p>No post found</p>;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <AppBar position="static" className="bg-orange-500">
        <Toolbar>
          <SpeechControls
            sx={{ px: 2 }}
            setCurrentlyReading={setCurrentlyReading}
            currentlyReading={currentlyReading}
          />
          <Typography variant="h6" className="text-white">
            Title: {post.title}
          </Typography>
          <Paper sx={{ mx: 2, px: 2 }}>
            <CurrentVoice
              onClick={() => {
                setShowVoiceSelector(true);
              }}
            />
          </Paper>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          my: 0,
          mx: 0,
          px: 0,
          display: showVoiceSelector ? "none" : "block",
        }}
      >
        <PostBody post={post} currentlyReading={currentlyReading} />
        <Comments post={post} currentlyReading={currentlyReading} />
      </Container>
      <Container>
        <VoiceSelector
          visible={showVoiceSelector}
          onClose={() => setShowVoiceSelector(false)}
        />
      </Container>
    </Box>
  );
}

export default PostPage;
