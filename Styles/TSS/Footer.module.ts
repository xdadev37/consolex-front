import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'footer' | 'iframe'> = {
  footer: {
    backgroundColor: 'primary.600',
    padding: 2,
    '& > div > div': { marginBottom: 3 },
    boxShadow: '10px 10px 25px',
  },
  iframe: {
    borderWidth: 0,
    borderRadius: 6,
    transitionDuration: '0.2s',
    '&:hover': { borderRadius: 4 },
    height: 250,
    width: '95%',
  },
};

export default sx;
