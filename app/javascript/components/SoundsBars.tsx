import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Box } from "@mui/material";

interface ISoundBarsProps {
  soundActive: boolean;
}

const SoundBarsContainer = styled(Box)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 60px;
  height: 30px; /* Adjusted height for better visibility */
`;

const Bar = styled.div<{ height: number; isActive: boolean }>`
  width: 3px;
  margin-left: 3px;
  background-color: ${({ isActive }) => (isActive ? "#3f51b5" : "#c0c0c0")};
  height: ${({ height }) => height}px;
  transition:
    height 0.3s ease,
    background-color 0.3s ease;
`;

function SoundBars({ soundActive }: ISoundBarsProps) {
  const [activeBars, setActiveBars] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generateActiveBars = () => {
    const numberOfActive = Math.floor(Math.random() * 7) + 4; // Random number between 4 and 10
    const newActiveBars: number[] = [];
    for (let i = 0; i < numberOfActive; i += 1) {
      newActiveBars.push(i);
    }
    setActiveBars(newActiveBars);
  };

  useEffect(() => {
    if (soundActive) {
      generateActiveBars();
      intervalRef.current = setInterval(generateActiveBars, 500); // Change every 500ms
    } else {
      setActiveBars([]);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
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
        const height = isActive ? 10 + Math.floor(Math.random() * 10) : 5; // Random height between 10 and 20 when active
        return <Bar key={Math.random()} height={height} isActive={isActive} />;
      })}
    </SoundBarsContainer>
  );
}

export default SoundBars;
