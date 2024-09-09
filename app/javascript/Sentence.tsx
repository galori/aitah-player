import react from 'react';
import {Box} from "@mui/material";

interface SentenceProps {
  index: number,
  text: string
}

function Sentence({index, text}: SentenceProps)
{
    return (
      <Box
        className="sentence"
        key={'sentence-' + index}
        dangerouslySetInnerHTML={{__html: text}}
        sx={{px: (index == 0 ? 0 : 0.3),
        display: 'inline'}}>
      </Box>
    );
}

export default Sentence;