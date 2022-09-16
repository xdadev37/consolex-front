import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'paper' | 'modal' | 'actions' | 'contents'> = {
  paper: {
    overflowY: 'unset',
    borderRadius: 5,
  },
  modal: { padding: 2 },
  actions: { justifyContent: 'flex-start' },
  contents: { '& > div > div > p > img': { width: 800, height: 500 } },
};

export default sx;
