import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface SectionProps {
  window?: () => Window;
  children: JSX.Element;
}

const ElevationScroll: React.FC<SectionProps> = (props: SectionProps) => {
  // Declare props
  const { window, children } = props;
  // Declare dispatch, reducers, common themes
  // Declare states

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

export default ElevationScroll;
