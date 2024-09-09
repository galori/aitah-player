import {SxProps, Theme} from "@mui/material";

export const playbackButtonStyles : SxProps<Theme> = {
  bgcolor: 'white',
  boxShadow: 2,
  mx: 0.5,
  '& .MuiSvgIcon-root': {
    color: 'blue'
  }
}

export const playbackIconStyles : SxProps<Theme> = {
  color: 'blue'
}
