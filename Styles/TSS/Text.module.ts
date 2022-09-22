import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'root' | 'adornment'> = {
  root: {
    borderRadius: 5,
    borderStyle: 'none',
    minHeight: 39.5,

    '.MuiInputBase-root': {
      minHeight: 39.5,
      color: 'primary.A100',
      borderRadius: 5,
    },
    '.MuiOutlinedInput-root': {
      padding: 0,
      paddingInline: 1,
      backgroundColor: '#f1f3f4',
    },
    '.MuiInputLabel-root': {
      bottom: 30,
      overflow: 'visible',
      display: 'flex',
      alignItems: 'center',
      color: 'primary.A100',
      opacity: 0.5,
    },
  },
  adornment: { color: 'primary.A100' },
};

export const passSX = {
  ...sx.root,
  '.MuiInputBase-input': {
    direction: 'rtl',
    fontFamily: 'sans-serif !important',
    marginBottom: 0.4,
  },
};

export default sx;
