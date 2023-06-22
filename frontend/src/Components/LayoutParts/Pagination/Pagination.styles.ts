import { SxProps, Theme } from '@mui/system';

export const mainStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  minWidth: '28px',
  height: '28px',
  textTransform: 'unset',
  fontSize: '12px',
  lineHeight: '20px',
  borderColor: 'transparent',
  color: '#000000',
  margin: '0 2px',
  padding: {
    xs: '0px',
    md: '0 16px',
  },
  ':hover': {
    borderColor: 'rgba(0,0,0,0.5)',
  },
};
