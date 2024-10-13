import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PostHeader from "./PostHeader";
import { Post } from "./types";
import AppLayout from "./AppLayout";
import PostPageBody from "./PostPageBody";

function PostPage({
  version,
}: {
  version: React.MutableRefObject<string | null>;
}) {
  const { id } = useParams<{ id: string }>();
  const [currentlyReading, setCurrentlyReading] = useState<number | null>(null);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  const postId = id;

  if (!postId) throw new Error("No post ID provided");

  return (
    <AppLayout
      header={
        <PostHeader
          setCurrentlyReading={setCurrentlyReading}
          currentlyReading={currentlyReading}
          post={post}
          setShowVoiceSelector={setShowVoiceSelector}
          version={version}
        />
      }
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
    />
  );
}

export default PostPage;
