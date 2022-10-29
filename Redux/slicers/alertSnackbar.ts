import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IReduxAlert } from 'Types/Redux/AlertSnackbar'

const initialState: IReduxAlert = {
  severity: 'success',
  message: '',
}

const alertMessageSlice = createSlice({
  name: 'alertSnackbar',
  initialState,
  reducers: {
    setAlertInfo: (state, action: PayloadAction<IReduxAlert>) => action.payload,
    closeAlert: () => initialState,
  },
})

export const { setAlertInfo, closeAlert } = alertMessageSlice.actions
export default alertMessageSlice
