import React, {useEffect} from 'react';
import {Box, Paper, Stack, Typography} from "@mui/material";
import FetchComments, {Comment, FlatSentence} from "./fetch/FetchComments";
import Sentence from "./Sentence";
import {Post} from "./types";
import roundUpvotes from "./lib/roundUpvotes";

const NESTED_INDENT_PIXELS = 10;

export interface CommentsViewProps {
  currentlyReading: number | null;
  post: Post | null;
}

function CommentsView({currentlyReading, post}: CommentsViewProps) {

  const [alreadyFetched, setAlreadyFetched] = React.useState<boolean>(false);
  const [comments, setComments] = React.useState<Comment[] | undefined>(undefined);

  function  renderComments() {
    if (!post) return <p>Loading..</p>
    const sentenceIndexOffset = post.sentences.length + 1;
    return comments?.map((comment: Comment, commentIndex: number) => (
      <Box key={Math.random()}
           data-comment-index={commentIndex}
           sx={{ '&&': {marginLeft: `${comment.depth * NESTED_INDENT_PIXELS}px`} // the && increases specificity to override the default margins
      }}>

        <Sentence indexInParent={0} currentlyReading={currentlyReading}
                  sentenceIndex={(comment.sentenceIndexForAuthor ?? 0) + sentenceIndexOffset}>
          <strong>{comment.depth === 0 ? 'Top comment' : 'Reply'} by {comment.author}</strong> ( {roundUpvotes(comment.score)} ):
        </Sentence>
        <Typography variant="body1" component="span">
          {comment.sentences.map((sentence: FlatSentence, index: number) => {
              const sentenceIndex = (sentence.sentenceIndex ?? 0) + sentenceIndexOffset;
              return (
                <Sentence key={sentenceIndex} indexInParent={index} currentlyReading={currentlyReading}
                          sentenceIndex={sentenceIndex}>
                  {sentence.text}.
                </Sentence>
              );
            }
          )}
        </Typography>
      </Box>
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
    <Paper sx={{width: "100%", boxShadow: "none", py: 2}}>
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
