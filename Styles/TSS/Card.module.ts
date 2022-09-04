import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'card' | 'dropMenu'> = {
  card: {
    marginBottom: 2,
    color: '#ffd401',
    borderRadius: 5,
    '.MuiCardHeader-subheader': { fontWeight: 'bold' },
  },
  dropMenu: { color: '#ffd401' },
};

export default sx;
