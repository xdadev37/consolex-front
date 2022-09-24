import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'card' | 'dropMenu' | 'media'> = {
  card: {
    marginBottom: 2,
    borderRadius: 5,
    '.MuiCardHeader-subheader': { fontWeight: 'bold' },
    width: 300,
    boxShadow: '3px 3px 7px',
  },
  dropMenu: { color: '#fafafa' },
  media: { borderRadius: 8, padding: 1 },
};

export default sx;
