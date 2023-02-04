import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IParams } from 'Types/Redux/Shop'
import type { RooState } from 'Redux/store'

const initialState: Record<string, IParams | undefined> = {
  params: undefined,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<IParams>) => ({
      params: { ...action.payload },
    }),
  },
})

export const selectParams = (state: RooState) => state.categories.params

export const {
  actions: { setParams },
  reducer,
  name,
} = categoriesSlice
