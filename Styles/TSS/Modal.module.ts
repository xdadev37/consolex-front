import type { MuiClasses } from 'Types/EnvTypes'

const sx: MuiClasses<'paper' | 'modal' | 'actions' | 'contents'> = {
  paper: {
    overflowY: 'unset',
    borderRadius: 5,
  },
  modal: { padding: 2 },
  actions: { justifyContent: 'flex-start' },
  contents: {
    '& > p > img': {
      width: 600,
      height: 800,
      aspectRatio: '2/1',
      objectFit: 'cover',
    },
  },
}

export default sx
