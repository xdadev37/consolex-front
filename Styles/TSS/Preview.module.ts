import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'transition1' | 'transition2' | 'transition3'> = {
  transition1: {
    transitionDelay: '0.3s',
  },
  transition2: {
    transitionDelay: '0.6s',
  },
  transition3: {
    transitionDelay: '0.9s',
  },
};

export default sx;
