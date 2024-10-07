import React, {ReactNode} from "react";
import {Box, Container} from "@mui/material";

interface SentenceProps {
  indexInParent: number;
  currentlyReading: number | null;
  children: ReactNode;
  sentenceIndex: number | null;
}

function Sentence({ indexInParent, currentlyReading, children, sentenceIndex }: SentenceProps) {
  const shouldHighlight = (currentlyReading === sentenceIndex);
  return (
    <Box
      className="sentence"
      key={`sentence-${sentenceIndex}`}
      data-sentence-index={sentenceIndex}
      sx={{
        px: indexInParent === 0 ? 0 : 0.3,
        display: "inline",
        backgroundColor: shouldHighlight ? "lightgray" : "transparent",
        borderRight: "3px solid blue",
        borderLeft: "3px solid blue",
      }}
    >
      <Container component="span" sx={{border: '1px black solid', padding: '1px !important'}}>{sentenceIndex}</Container>
      <Container component="span" sx={{padding: '0px 2px !important'}}>{children}</Container>
    </Box>
  );
}

export default Sentence;
