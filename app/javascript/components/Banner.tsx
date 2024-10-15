import React from "react";
import {Box, Typography} from "@mui/material";

function Banner() {
  return (
    <Box
      sx={{
        background: "#f0f0f0 url('/images/underwater-banner.png') center / cover no-repeat",
        height: "100%",
        width: "100%",
        borderRadius: "10px",
      }}>
      <Typography variant="h3" sx={{color: "white", textAlign: "left", p: 2}}>
        r/aitah
      </Typography>

    </Box>
  );
}

export default Banner;
