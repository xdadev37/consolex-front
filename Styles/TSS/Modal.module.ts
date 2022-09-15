import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'paper' | 'modal' | 'actions'> = {
  paper: { overflowY: 'unset', borderRadius: 5 },
  modal: { padding: 2 },
  actions: { justifyContent: 'flex-start' },
};

export default sx;
