import type { MuiClasses } from 'Types/EnvTypes'

// export const color = [
//   '#4E470C',
//   '#565656',
//   '#212B29',
//   '#2E4E24',
//   '#534738',
//   '#3A444A',
//   '#85226E',
//   '#1A5379',
//   '#23446C',
//   '#24244A',
//   '#132139',
//   '#94333B',
//   '#732AA4',
//   '#5A4A2D',
//   '#2B3548',
//   '#2C3C44',
//   '#6C1414',
//   '#162822',
//   '#425170',
//   '#223031',
//   '#302731',
//   '#23232D',
//   '#694865',
//   '#2F2126',
//   '#94157C',
//   '#0C0742',
// ]

export const color = [
  '#DBDADA',
  '#FEE0D4',
  '#E4ECFC',
  '#FFFFFF',
  '#DBDADA',
  '#E2E3D6',
  '#DBD9EA',
  '#C1DEF6',
  '#CDDDF1',
  '#C5DED5',
  '#F1EAE4',
  '#E2D4C1',
  '#CDDADA',
  '#ECDEC1',
  '#D2D4D5',
  '#BBDDE7',
  '#E0E4CB',
  '#D4DCEC',
  '#F3CAED',
  '#D9D2EF',
  '#D1D8F3',
]

const sx: MuiClasses<'card' | 'dropMenu' | 'media'> = {
  card: {
    marginBottom: 2,
    borderRadius: 5,
    '.MuiCardHeader-subheader': { fontWeight: 'bold' },
    width: 300,
    boxShadow: '3px 3px 7px',
    // backgroundColor: color.at(Math.floor(Math.random() * color.length)),
    margin: 5,
  },
  dropMenu: { color: 'primary.main' },
  media: { objectFit: 'contain' },
}

export default sx
