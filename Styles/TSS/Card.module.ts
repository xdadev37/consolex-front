import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'card' | 'dropMenu'> = {
  card: {
    marginBottom: 2,
    color: '#0e0e0e',
    borderRadius: 5,
    '.MuiCardHeader-subheader': { fontWeight: 'bold' },
  },
  dropMenu: { color: '#0e0e0e' },
};

export default sx;
