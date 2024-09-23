import React from "react";
import { Box } from "@mui/material";

interface SentenceProps {
  index: number;
  text: string;
  currentlyReading?: boolean;
}

function Sentence({ index, text, currentlyReading = false }: SentenceProps) {
  return (
    <Box
      className="sentence"
      key={`sentence-${index}`}
      dangerouslySetInnerHTML={{ __html: text }}
      sx={{
        px: index === 0 ? 0 : 0.3,
        display: "inline",
        backgroundColor: currentlyReading ? "lightgray" : "transparent",
        borderRight: "3px solid blue",
        borderLeft: "3px solid blue",
      }}
    />
  );
}

export default Sentence;
