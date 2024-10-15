import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Controls from "./Controls";
import {EasySpeechState, Post} from "./types";
import AppLayout from "./AppLayout";
import PostPageBody from "./PostPageBody";
import Banner from "./components/Banner";

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [currentlyReading, setCurrentlyReading] = useState<number | null>(null);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [easySpeechState, setEasySpeechState] =
    React.useState<EasySpeechState>("stopped");

  const postId = id;

  if (!postId) throw new Error("No post ID provided");

  return (
    <AppLayout
      header={ <Banner soundActive={easySpeechState === 'playing'}/> }
        body={
          <PostPageBody
            postId={postId}
            currentlyReading={currentlyReading}
            setPost={setPost}
            post={post}
            showVoiceSelector={showVoiceSelector}
            setShowVoiceSelector={setShowVoiceSelector}
          />
        }
        controls={
          <Controls
            setCurrentlyReading={setCurrentlyReading}
            currentlyReading={currentlyReading}
            easySpeechState={easySpeechState}
            setEasySpeechState={setEasySpeechState}
            post={post}
          />
        }
        />
        );
        }

        export default PostPage;
