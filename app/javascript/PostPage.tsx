import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {Container, Box, Paper} from "@mui/material";
import VoiceSelector from "./VoiceSelector";
import PostBody from "./PostBody";
import CommentsView from "./CommentsView";
import PostHeader from "./PostHeader";
import {Post} from "./types";
import PostTitle from "./components/PostTitle";

function PostPage({ version }: { version: React.MutableRefObject<string | null> }) {
  const { id } = useParams<{ id: string }>();
  const [currentlyReading, setCurrentlyReading] = useState<number | null>(null);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  if (!id) throw new Error("No post ID provided");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <PostHeader setCurrentlyReading={setCurrentlyReading} currentlyReading={currentlyReading} post={post} setShowVoiceSelector={setShowVoiceSelector} version={version} />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          my: 0,
          mx: 0,
          px: 0,
          display: showVoiceSelector ? "none" : "block",
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <Paper sx={{ m: 1, p: 2, mt: 0 }}>
          <PostTitle currentlyReading={currentlyReading} post={post} />
        </Paper>
        <PostBody postId={id} currentlyReading={currentlyReading} setPost={setPost} post={post} />
        <CommentsView currentlyReading={currentlyReading} post={post} />
      </Container>
      <VoiceSelector
        visible={showVoiceSelector}
        onClose={() => setShowVoiceSelector(false)}
      />
    </Box>
  );
}

export default PostPage;
