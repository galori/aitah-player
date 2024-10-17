import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';

interface SoundBarsProps {
  active: boolean;
}

const SoundBarsContainer = styled(Box)`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 60px;
    height: 30px; /* Adjusted height for better visibility */
`;

const Bar = styled.div<{ height: number; $isActive: boolean }>`
    width: 3px;
    margin-left: 3px;
    background-color: ${({ $isActive }) => ($isActive ? '#3f51b5' : '#3f51b5')}; /* Maintains active color */
    height: ${({ height }) => height}px;
    transition: height 0.3s ease;
`;

function SoundBars({ soundActive } : {soundActive: boolean}) {
  const [activeBars, setActiveBars] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // To store the last heights of the bars
  const [barHeights, setBarHeights] = useState<number[]>(Array(10).fill(5));

  const generateActiveBars = () => {
    const numberOfActive = Math.floor(Math.random() * 7) + 4; // Random number between 4 and 10
    const newActiveBars: number[] = [];
    for (let i = 0; i < numberOfActive; i += 1) {
      newActiveBars.push(i);
    }
    setActiveBars(newActiveBars);

    // Update bar heights
    setBarHeights((prevHeights) =>
      prevHeights.map((height, index) =>
        newActiveBars.includes(index) ? 10 + Math.floor(Math.random() * 10) : height
      )
    );
  };

  useEffect(() => {
    if (soundActive) {
      generateActiveBars();
      intervalRef.current = setInterval(generateActiveBars, 500); // Change every 500ms
    } else  if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [soundActive]);

  return (
    <SoundBarsContainer>
      {Array.from({ length: 10 }).map((_, index) => {
        // Align bars to the right by reversing the index
        const reverseIndex = 9 - index;
        const isActive = activeBars.includes(reverseIndex);
        const height = barHeights[reverseIndex];
        return <Bar key={Math.random()} height={height} $isActive={isActive} />;
      })}
    </SoundBarsContainer>
  );
}

export default SoundBars;
