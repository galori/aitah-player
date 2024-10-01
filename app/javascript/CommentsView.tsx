import React, {useEffect} from 'react';
import {Box, Paper, Stack, Typography} from "@mui/material";
import FetchComments, {Comments} from "./fetch/FetchComments";
import Sentence from "./Sentence";

export interface CommentsViewProps {
  postId: string;
  currentlyReading: number | null;
}

function CommentsView({postId, currentlyReading}: CommentsViewProps) {

  const [alreadyFetched, setAlreadyFetched] = React.useState<boolean>(false);
  const [comments, setComments] = React.useState<Comments | undefined>(undefined);

  useEffect(() => {
    if (alreadyFetched || !postId) return;
    const performFetch = async () => {
      const fetchComments = new FetchComments(postId, setComments);
      await fetchComments.performFetch();
    }
    performFetch().catch(console.error);
    setAlreadyFetched(true);
  }, [postId, currentlyReading, setAlreadyFetched, alreadyFetched]);

  return (
    <Paper sx={{width: "100%", boxShadow: "none", px: 4, py: 2}}>
      <Typography variant="h2">Comments</Typography>
      <Typography component="span" sx={{px: 0.2, display: "block"}}>
        <Stack spacing={2}>
          {comments && comments.map((comment, index) => (
            <Paper
              elevation={1}
              sx={{p: 2, bgcolor: 'background.paper'}}
              key={`sentence-outer-${index}`} // eslint-disable-line react/no-array-index-key
            >

              <Sentence
                key={`sentence-${index}`} // eslint-disable-line react/no-array-index-key
                index={index}
                currentlyReading={currentlyReading === index}>
                <>
                  <Box>by <strong>{comment.author}</strong> ({comment.score} upvotes)</Box>
                  <Box>{comment.body}</Box>
                </>

              </Sentence>
            </Paper>
          ))}
        </Stack>
      </Typography>
    </Paper>
  )
}

export default CommentsView;
