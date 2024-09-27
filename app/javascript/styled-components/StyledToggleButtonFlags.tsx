import styled from 'styled-components';
import ToggleButton from '@mui/material/ToggleButton';

const StyledToggleButtonFlags = styled(ToggleButton)`
  font-size: 3rem;
  color: white;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 54px;
  background-color: #1976d2;
  box-shadow: 8px 6px 13px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #333499;
  }

  &.Mui-selected {
    background-color: #104e8a;

    &:hover {
      background-color: #333499;
    }
  }
`;

export default StyledToggleButtonFlags;