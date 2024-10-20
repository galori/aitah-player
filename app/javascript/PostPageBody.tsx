import React from "react";
import {Box, Container, Paper} from "@mui/material";
import PostTitle from "./components/PostTitle";
import PostBody from "./PostBody";
import CommentsView from "./CommentsView";
import VoiceSelector from "./VoiceSelector";
import { Post } from "./types";

export interface IPostPageBodyProps {
  currentlyReading: number | null;
  setPost: (post: Post) => void;
  post: Post | null;
  postId: string;
  showVoiceSelector: boolean;
  setShowVoiceSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

function PostPageBody({
  currentlyReading,
  setPost,
  post,
  postId,
  showVoiceSelector,
  setShowVoiceSelector,
}: IPostPageBodyProps) {
  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          my: 0,
          mx: 0,
          px: 0,
          display: showVoiceSelector ? "none" : "block",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Box sx={{color: 'white'}}>
          <PostTitle currentlyReading={currentlyReading} post={post} />
        </Box>
        <PostBody
          postId={postId}
          currentlyReading={currentlyReading}
          setPost={setPost}
          post={post}
        />
        <CommentsView currentlyReading={currentlyReading} post={post} />
      </Container>
      <VoiceSelector
        visible={showVoiceSelector}
        onClose={() => setShowVoiceSelector(false)}
      />
    </>
  );
}

export default PostPageBody;
