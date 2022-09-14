import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'paper' | 'close'> = {
  paper: { overflowY: 'unset' },
  close: {
    position: 'absolute',
    left: '95%',
    top: '-9%',
    backgroundColor: 'error.main',
    color: 'white',
  },
};

export default sx;
