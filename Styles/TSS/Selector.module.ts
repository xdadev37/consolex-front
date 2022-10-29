import type { MuiClasses } from 'Types/EnvTypes'

const sx: MuiClasses<'group' | 'options' | 'adornment' | 'popper' | 'paper'> = {
  group: {
    justifyContent: 'flex-end',
    '&:hover': { backgroundColor: 'transparent' },
  },
  options: { '&:hover': { backgroundColor: 'transparent' } },
  adornment: {
    '.MuiButtonBase-root': { padding: 0.8 },
    '.MuiOutlinedInput-root': { alignContent: 'center' },
    marginX: 1,
  },
  popper: { zIndex: 1399 },
  paper: { borderRadius: 5 },
}

export default sx
