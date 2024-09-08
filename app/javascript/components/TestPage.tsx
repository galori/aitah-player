import React from 'react';
import { Typography, Button } from '@mui/material';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 20px;
`;

const TestPage: React.FC = () => (
  <StyledDiv>
    <Typography variant="h1">Welcome to My Rails + React App</Typography>
    <Typography variant="body1">
      This is a test page using MUI components and styled-components.
    </Typography>
    <Button variant="contained" color="primary">
      Click me!
    </Button>
  </StyledDiv>
);

export default TestPage;