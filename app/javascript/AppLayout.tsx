import React from "react";
import {Box} from "@mui/material";

export interface IAppLayoutProps {
  header: React.ReactNode;
  body: React.ReactNode;
  controls: React.ReactNode;
}

function AppLayout({header, body, controls}: IAppLayoutProps) {

  return (

    <Box sx={{
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", p: 1}} id='app-header'>
        {header}
      </Box>

      <Box sx={{flex: 1, overflowY: "auto", p: 1}} id='app-body'>
        {body}
      </Box>

      <Box sx={{flex: 1, p: 1}} id='app-body'>
        {controls}
      </Box>

    </Box>
  );
}

export default AppLayout;