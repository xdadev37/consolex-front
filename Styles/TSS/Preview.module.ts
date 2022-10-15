import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'dialog' | 'zeroPad'> = {
  dialog: { overflow: 'hidden', backgroundColor: '#fafafa' },
  zeroPad: {
    padding: 0,
    overflow: 'hidden',
    scrollbarWidth: 0,
    backgroundColor: '#fafafa',
  },
};

export default sx;
