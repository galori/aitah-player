import React, {useEffect} from 'react';
import {Paper, Stack, Typography} from "@mui/material";
import FetchComments, { Comments, Comment } from "./fetch/FetchComments";
// import Sentence from "./Sentence";

export interface CommentsViewProps {
  postId: string;
  currentlyReading: number | null;
}

export interface IStackEntryType {
  comment:Comment;
  depth:number;
}

type StackEntryType = (IStackEntryType | undefined);

type StackType = StackEntryType[];

const renderComments = (comments:Comments) => {
  const result: React.ReactElement[] = [];

  const stack:StackType = comments.map(comment => ({ comment, depth: 0 }));

  while (stack.length > 0) {
    const stackEntry = stack.pop();

    if (stackEntry) {
      const {comment, depth} = stackEntry;

      result.unshift(
        <div key={result.length} style={{marginLeft: `${depth * 60}px`}}>
          <p><strong>{comment.author}</strong> ({comment.score} upvotes)</p>
          <p>{comment.body}</p>
        </div>
      )

      if (comment.replies) {
        stack.push(...comment.replies.map(reply => ({ comment: reply, depth: depth+1})));
      }
    }

  }

  return result;
}

function CommentsView({postId, currentlyReading}: CommentsViewProps) {

  const [alreadyFetched, setAlreadyFetched] = React.useState<boolean>(false);
  const [comments, setComments] = React.useState<Comments | undefined>(undefined);

  useEffect(() => {
    if (alreadyFetched || !postId) return;
    const callFetch = async () => {
      await new FetchComments(postId, setComments).performFetch();
    }
    callFetch().catch(console.error);
    setAlreadyFetched(true);
  }, [postId, currentlyReading, setAlreadyFetched, alreadyFetched]);

  return (
    <Paper sx={{width: "100%", boxShadow: "none", px: 4, py: 2}}>
      <Typography variant="h2">Comments</Typography>
      <Typography component="span" sx={{px: 0.2, display: "block"}}>
        <Stack spacing={2}>
          { comments && renderComments(comments)}
        </Stack>
      </Typography>
    </Paper>
  )
}

export default CommentsView;
