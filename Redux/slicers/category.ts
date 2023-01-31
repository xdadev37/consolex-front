import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setInit: () => {},
  },
})

export const {
  actions: { setInit },
  reducer,
  name,
} = categorySlice
