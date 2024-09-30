import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Box
} from "@mui/material";
import SpeechControls from "./SpeechControls";
import CurrentVoice from "./CurrentVoice";
import VoiceSelector from "./VoiceSelector";
import PostBody from "./PostBody";
import CommentsView from "./CommentsView";

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
      <AppBar position="static" className="bg-orange-500">
        <Toolbar>
          <SpeechControls
            sx={{ px: 2 }}
            setCurrentlyReading={setCurrentlyReading}
            currentlyReading={currentlyReading}
          />
          <Typography variant="h6" className="text-white">
            Title: {title}
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
