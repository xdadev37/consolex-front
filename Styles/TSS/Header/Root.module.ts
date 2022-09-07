import { createTheme } from '@mui/material/styles';
import type { MuiClasses } from 'Types/EnvTypes';

const sx: MuiClasses<'root'> = {
  root: { direction: 'rtl', ':lang': 'fa-IR', scrollBehavior: 'smooth' },
};

export const useTheme = () =>
  createTheme({
    direction: 'rtl',
    palette: {
      mode: true ? 'light' : 'dark',
      primary: {
        main: '#ffd401',
        '100': '#4caf50',
        '200': '#ef5350',
        '300': '#2196f3',
      },
    },
  });

export default sx;
