import type { MuiClasses } from 'Types/EnvTypes'

const sx: MuiClasses<'paper' | 'modal' | 'actions' | 'contents'> = {
  paper: {
    overflowY: 'unset',
    borderRadius: 5,
  },
  modal: { padding: 2 },
  actions: { justifyContent: 'flex-start' },
  contents: { '& > iframe': { height: 250, width: '100%' } },
}

export default sx
