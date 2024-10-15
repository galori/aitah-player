import React from "react";
import { Box } from "@mui/material";

export interface IconProps {
  name: string;
  circle?: boolean;
  nudge?: number;
  size?: "1x" | "2x" | "3x" | "4x" | "5x";
  onClick?: () => void;
}

function Icon({ name, circle, nudge, size, onClick }: IconProps) {
  const sizeX = size ?? "1x";
  if (circle) {
    const nudgeStyle = nudge ? { marginLeft: `${nudge}px` } : {};
    return (
      <Box component="span" className={`fa-stack fa-${sizeX}`}>
        <Box
          component="i"
          className="fa fa-circle fa-stack-2x"
          style={{
            color: "#DDEEFA",
            textShadow: "-6px 6px 15px rgba(0, 0, 0, 1)",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          }}
          onClick={onClick}
        />
        <Box
          component="i"
          className={`fa fa-${name} fa-stack-1x fa-inverse`}
          style={{ ...nudgeStyle, color: "black", pointerEvents: 'none' }}

        />
      </Box>
    );
  }
  return <i className={`fa fa-${name}`} />;
}

export default Icon;
