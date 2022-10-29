import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RooState, AppDispatch } from 'Redux/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RooState> = useSelector
