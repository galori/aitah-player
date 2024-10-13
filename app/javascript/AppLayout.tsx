import React from "react";
import {Box} from "@mui/material";

export interface IAppLayoutProps {
  children: React.ReactNode;
}

interface IAppLayoutSubComponentProps {
  children: React.ReactNode;
}


function AppLayout: React.FC<IAppLayoutProps> & {
  Controls: React.FC<IAppLayoutSubComponentProps>;
  Body: React.FC<IAppLayoutSubComponentProps>;
} = ({ children }) => {
  let controls = null;
  let body = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === AppLayout.Controls) controls = child;
    if (child.type === AppLayout.Body) body = child;
  });

  return (
    <Box sx={{ height: "100vh", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", p: 2 }}>
      {controls}
    </Box>

    <Box sx={{flex: 1, overflowY: "auto", p: 2 }}>
      {body}
    </Box>
  );
}

AppLayout.Controls = ({ children }: IAppLayoutSubcomponent  => <>{children}</>;
AppLayout.Body = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export default AppLayout;