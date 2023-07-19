import type { MuiClasses } from 'Types/EnvTypes'

const sx: MuiClasses<'toggler' | 'togglerGroup'> = {
  toggler: { borderRadius: 1.5, color: '#fff' },
  togglerGroup: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
}

export default sx
