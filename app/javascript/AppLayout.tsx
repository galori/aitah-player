import React from "react";
import {Box} from "@mui/material";

export interface IAppLayoutProps {
  header: React.ReactNode;
  body: React.ReactNode;
}

function AppLayout({header, body}: IAppLayoutProps) {

  return (

    <Box sx={{
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{ flex: "0 0 25%", display: "flex", alignItems: "center", justifyContent: "center", p: 2, backgroundColor: '#006DC9'}}>
        {header}
      </Box>

      <Box sx={{flex: 1, overflowY: "auto", p: 2}}>
        {body}
      </Box>
    </Box>
  );
}

export default AppLayout;