import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'footer' | 'iframe'> = {
  footer: {
    backgroundColor: 'primary.main',
    backgroundImage: 'linear-gradient(90deg, #ffd401, #ffd600)',
    padding: 2,
    '& > div > div': { marginBottom: 3 },
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
