import React from "react";
import {Box, Typography} from "@mui/material";
import SoundBars from "./SoundsBars";

export interface IBannerProps {
  soundActive: boolean;
}

function Banner({soundActive}: IBannerProps) {
  return (
    <Box
      sx={{
        background: "#f0f0f0 url('/images/underwater-banner.png') center / cover no-repeat",
        height: "100%",
        width: "100%",
        borderRadius: "10px",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'top',
      }}>
      <Typography variant="h3" sx={{color: "white", textAlign: "left", p: 2}}>
        r/aitah
      </Typography>
      <SoundBars soundActive={soundActive} />

    </Box>
  );
}

export default Banner;
