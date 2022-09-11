import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'footer'> = {
  footer: {
    backgroundColor: 'primary.main',
    backgroundImage: 'linear-gradient(90deg, #ffd401, #ffd600)',
    padding: 2,
    '& > div > div': { marginBottom: 3 },
  },
};

export default sx;
