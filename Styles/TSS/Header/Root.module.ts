import { createTheme } from '@mui/material/styles';

export const useTheme = () =>
  createTheme({
    direction: 'rtl',
    palette: {
      mode: 'light',
      primary: {
        main: '#ffd401',
        '100': '#4caf50',
        '200': '#ef5350',
        '300': '#2196f3',
        '400': '#ffeb3b',
      },
    },
  });
