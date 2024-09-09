import React from 'react';
import { Button } from '@mui/material';
import { useEffect } from 'react';

function Speech() {

  useEffect(() => {
    startTextToSpeech();
  });

  // iterate through all span.sentence elements and read them out loud
  const startTextToSpeech = () => {
    const sentences = document.querySelectorAll('span.sentence');
    sentences.forEach((sentence) => {
      const text = sentence.textContent;
      if (text) readText(text);
    });
  }

  const readText = (text: string) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = 'en-US';
    speechSynthesis.speak(speech);
  }

  return (
    <Button onClick={() => console.log('Hello!')} />
  )
}

export default Speech;