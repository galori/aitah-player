import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {Container, Box} from "@mui/material";
import VoiceSelector from "./VoiceSelector";
import PostBody from "./PostBody";
import CommentsView from "./CommentsView";
import PostHeader from "./PostHeader";

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [currentlyReading, setCurrentlyReading] = useState<number | null>(null);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [title, setTitle] = useState<string | null>(null);

  if (!id) {
    throw new Error("No post ID provided");
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <PostHeader setCurrentlyReading={setCurrentlyReading} currentlyReading={currentlyReading} title={title} setShowVoiceSelector={setShowVoiceSelector} />
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
        <PostBody postId={id} currentlyReading={currentlyReading} setTitle={setTitle} />
        <CommentsView postId={id} currentlyReading={currentlyReading} />
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
