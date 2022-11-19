import type { MuiClasses } from 'Types/EnvTypes'

const sx: MuiClasses<'toggler' | 'togglerGroup'> = {
  toggler: { borderRadius: 8, color: '#fff' },
  togglerGroup: { flexDirection: 'row-reverse', justifyContent: 'flex-end' },
}

export default sx
