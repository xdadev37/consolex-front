import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
})

export const {
  actions: {},
  reducer,
  name,
} = categorySlice
