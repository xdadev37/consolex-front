import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IParams } from 'Types/Redux/Shop.d'
import type { ISlicer } from 'Types/Redux/Categories.d'
import type { RooState } from 'Redux/store'
import type { IImages } from 'Types/Redux/Images'

const initialState: ISlicer = {
  params: null,
  mainPage: true,
  images: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<IParams>) => ({
      ...state,
      params: { ...state.params, ...action.payload },
    }),
    setImages: (state, action: PayloadAction<IImages>) => ({
      ...state,
      params: { ...state.params, ...action.payload },
    }),
    setMainPage: (state, action: PayloadAction<boolean>) => ({
      ...state,
      mainPage: action.payload,
    }),
  },
})

export const selectParams = (state: RooState) => state.categories.params
export const selectImages = (state: RooState) => state.categories.images
export const selectMainPage = (state: RooState) => state.categories.mainPage

export const {
  actions: { setParams, setMainPage, setImages },
  reducer,
  name,
} = categoriesSlice
