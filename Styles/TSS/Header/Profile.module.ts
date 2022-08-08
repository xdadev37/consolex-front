import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<
  | 'white'
  | 'iconColor'
  | 'menu'
  | 'backdropSet'
  | 'menuItem'
  | 'exitItem'
  | 'avatar'
> = {
  white: { color: 'primary.A200' },
  iconColor: { color: 'primary.main' },
  menu: { borderRadius: 5 },
  backdropSet: {
    backdropFilter: 'blur(3px)',
    backgroundColor: 'transparent',
  },
  menuItem: { color: 'primary.main' },
  exitItem: { color: 'primary.A400' },
  avatar: { width: 50, height: 50 },
};

export default sx;
