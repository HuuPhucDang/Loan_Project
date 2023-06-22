import { SxProps, Theme } from '@mui/system';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

export const appBarStyles: SxProps<Theme> = {
  // boxShadow: 1,
};

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? 'interhit' : "white",
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));
