import React, {useEffect} from 'react';
import {Paper, Stack, Typography} from "@mui/material";
import FetchComments, {Comment, FlatSentence} from "./fetch/FetchComments";
import Sentence from "./Sentence";
import {Post} from "./types";

export interface CommentsViewProps {
  currentlyReading: number | null;
  post: Post | null;
}

function CommentsView({currentlyReading, post}: CommentsViewProps) {

  const [alreadyFetched, setAlreadyFetched] = React.useState<boolean>(false);
  const [comments, setComments] = React.useState<Comment[] | undefined>(undefined);

  function renderComments() {
    return comments?.map((comment:Comment) => (
        <Stack key={Math.random()} spacing={2}>
          <Typography variant="h4">{comment.author} ({comment.score} upvotes)</Typography>
          <Typography variant="body1" component="span">
            {comment.sentences.map((sentence:FlatSentence, index:number) =>
              <Sentence key={sentence.sentenceIndex} index={index} currentlyReading={currentlyReading} sentenceIndex={sentence.sentenceIndex}>
                {sentence.text}
              </Sentence>
            )}
          </Typography>
        </Stack>
      ))
  }

  useEffect(() => {
    if (alreadyFetched || !post) return;
    const callFetch = async () => {
      await new FetchComments(post, setComments).performFetch();
    }
    callFetch().catch(console.error);
    setAlreadyFetched(true);
  }, [post, currentlyReading, setAlreadyFetched, alreadyFetched]);

  if (!comments || !post) {
    return <p>Loading...</p>
  }

  return (
    <Paper sx={{width: "100%", boxShadow: "none", px: 4, py: 2}}>
      <Typography variant="h2">Comments</Typography>
      <Typography component="span" sx={{px: 0.2, display: "block"}}>
        <Stack spacing={2}>
          {comments && renderComments()}
        </Stack>
      </Typography>
    </Paper>
  )
}

export default CommentsView;
