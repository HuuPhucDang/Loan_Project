import { SxProps, Theme } from '@mui/system';
import { CommonColors } from '@themes';


const iconHoverStyle = (
  url: string,
  size: number[],
  hoverUrl?: string
): SxProps<Theme> => ({
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'round',
  cursor: 'pointer',
  width: size[0],
  height: size[1],
  '&:hover': {
    backgroundImage: `url(${hoverUrl || url})`,
  },
});

const hoverBorderEffect: SxProps<Theme> = {
  position: 'relative',
  cursor: 'pointer',
  '&:after': {
    left: '50%',
    width: 0,
  },
  '&:hover': {
    '&:after': {
      width: 1,
      left: 0,
    },
  },
};

const activeBorderEffect: SxProps<Theme> = {
  position: 'relative',
  cursor: 'pointer',
  '&:after': {
    transitionDelay: '1s',
    left: 0,
    width: 1,
  },
};

export const displayInDesktop: SxProps<Theme> = {
  display: { xs: 'none', sm: 'flex' },
};

export const displayInMobile: SxProps<Theme> = {
  display: { xs: 'flex', sm: 'none' },
};

export const listButtonStyles: SxProps<Theme> = {
  background: CommonColors.mainColor,
  color: 'white',
  borderRadius: 2,
  '&:hover': {
    background: CommonColors.burntSienna,
  },
};

export default {
  hoverBorderEffect,
  displayInDesktop,
  displayInMobile,
  activeBorderEffect,
  listButtonStyles,
  iconHoverStyle,
};
