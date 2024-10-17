import React from "react";
import {Box, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SoundBars from "./SoundsBars";
import Icon from "./Icon";

export interface IBannerProps {
  soundActive: boolean;
}

function Banner({soundActive}: IBannerProps) {
  const navigate = useNavigate();

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
      <Box sx={{
        width: "100%",
        height: "30%",
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        margin: "0 1rem",
      }}>
        <Icon name="sign-out" rotate="180" color="white" size="2x" onClick={() => navigate('/')}/>

        <Typography variant="h3" sx={{color: "white", textAlign: "left"}}>
          r/aitah
        </Typography>
        <SoundBars soundActive={soundActive}/>
      </Box>

    </Box>
  );
}

export default Banner;
