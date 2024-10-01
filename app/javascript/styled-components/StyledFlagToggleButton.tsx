import styled from 'styled-components';
import ToggleButton from '@mui/material/ToggleButton';

const StyledFlagToggleButton = styled(ToggleButton)`
    flex: 1;
    font-size: 10vw;
    color: white;
    padding: 0;
    border-radius: 54px;
    background-color: #1976d2;
    box-shadow: 8px 6px 13px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;

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

export default StyledFlagToggleButton;