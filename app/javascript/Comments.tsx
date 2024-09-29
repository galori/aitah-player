import React, {useEffect} from 'react';
import {Paper} from "@mui/material";
import FetchComments, {Comments} from "./fetch/FetchComments";

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
      <div>
        { comments && (
         <h1>{comments.length} Currently reading: {currentlyReading}</h1>
        )}
      </div>
      );
    </Paper>
  )
}

export default CommentsView;
