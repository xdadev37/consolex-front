import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'dialog' | 'zeroPad'> = {
  dialog: { overflow: 'hidden' },
  zeroPad: { padding: 0, overflow: 'scroll' },
};

export default sx;
