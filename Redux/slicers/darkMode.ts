import { createSlice } from '@reduxjs/toolkit'

const initialState = false
const darkMode = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    changeUIMode: state => {
      const newValue = !state
      localStorage.setItem('DarkMode', newValue.toString())
      return newValue
    },
  },
})

export const {
  actions: { changeUIMode },
  name,
  reducer,
} = darkMode
