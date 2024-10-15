import React, {ReactNode, useEffect, useRef} from "react";
import {Box, Container} from "@mui/material";
import {DEBUG} from "./initialize/config";

interface SentenceProps {
  indexInParent: number;
  currentlyReading: number | null;
  children: ReactNode;
  sentenceIndex: number | null;
}

function Sentence({ indexInParent, currentlyReading, children, sentenceIndex }: SentenceProps) {
  const isCurrentlyBeingSpoken = (currentlyReading === sentenceIndex);
  const conditionalStyles = DEBUG ? { border: '1px black solid', padding: '1px !important' } : {};
  const elementRef = useRef(null);

  const scrollElementToCenter = (element:HTMLElement, container:HTMLElement) => {
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const elementTopRelativeToContainer = elementRect.top - containerRect.top + container.scrollTop;
    const elementMiddle = elementTopRelativeToContainer + elementRect.height / 2;

    const containerMiddle = container.clientHeight / 2;
    const scrollPosition = elementMiddle - containerMiddle;

    container.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    if (isCurrentlyBeingSpoken && elementRef.current) {
      const element = elementRef.current as HTMLElement;
      const container = document.querySelector('#app-body') as HTMLElement;

      scrollElementToCenter(element, container);
    }
  }, [isCurrentlyBeingSpoken]);

  return (
    <Box
      ref={elementRef}
      className="sentence"
      key={`sentence-${sentenceIndex}`}
      data-sentence-index={sentenceIndex}
      sx={{
        px: indexInParent === 0 ? 0 : 0.3,
        display: "inline",
        backgroundColor: isCurrentlyBeingSpoken ? "lightgray" : "transparent",
        color: isCurrentlyBeingSpoken ? "black" : "white",
        ...conditionalStyles,
      }}
    >
      { DEBUG && <Container component="span" sx={{border: '1px black solid', padding: '1px !important'}}>{sentenceIndex}</Container>}
      <Container component="span" sx={{padding: '0px 2px !important'}}>{children}</Container>
    </Box>
  );
}

export default Sentence;
