import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('DarkMode') === 'true';
const darkMode = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    changeUIMode: (state) => {
      const newValue = !state;
      localStorage.setItem('DarkMode', newValue.toString());
      return newValue;
    },
  },
});

export const { changeUIMode } = darkMode.actions;
export default darkMode;
