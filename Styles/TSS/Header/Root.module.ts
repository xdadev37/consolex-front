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
        main: true ? '#fafafa' : '#ffd401',
      },
    },
  });

export default sx;
