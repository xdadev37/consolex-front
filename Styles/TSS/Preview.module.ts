import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'dialog' | 'zeroPad'> = {
  dialog: { overflow: 'hidden' },
  zeroPad: { padding: 0, overflow: 'scroll', scrollbarWidth: 0 },
};

export default sx;
