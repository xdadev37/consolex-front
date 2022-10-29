import type { MuiClasses } from 'Types/EnvTypes'

const sx: MuiClasses<'dialog' | 'zeroPad'> = {
  dialog: { overflow: 'hidden', backgroundColor: 'primary.main' },
  zeroPad: {
    padding: 0,
    overflow: 'hidden',
    scrollbarWidth: 0,
    backgroundColor: 'primary.main',
  },
}

export default sx
