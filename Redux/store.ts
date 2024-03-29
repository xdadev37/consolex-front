import { configureStore } from '@reduxjs/toolkit'
import * as darkMode from 'slicers/darkMode'
import * as alertMessage from 'slicers/alertSnackbar'
import * as shop from 'Redux/api/shop'
import * as contents from 'Redux/api/contents'
import * as images from 'api/images'
import * as categories from 'api/categories'
import * as category from 'slicers/category'
import * as banners from 'api/banners'
import { createWrapper } from 'next-redux-wrapper'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
  reducer: {
    [darkMode.name]: darkMode.reducer,
    [alertMessage.name]: alertMessage.reducer,
    [category.name]: category.reducer,
    [shop.reducerPath]: shop.reducer,
    [contents.reducerPath]: contents.reducer,
    [images.reducerPath]: images.reducer,
    [categories.reducerPath]: categories.reducer,
    [banners.reducerPath]: banners.reducer,
  },
  middleware: getDefault =>
    getDefault().concat([
      shop.middleware,
      contents.middleware,
      images.middleware,
      categories.middleware,
      banners.middleware,
    ]),
})

export type AppStore = typeof store
export type RooState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RooState> = useSelector

export const { withRedux, getStaticProps, getServerSideProps } = createWrapper(
  () => store
)
