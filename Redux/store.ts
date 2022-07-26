import { configureStore } from '@reduxjs/toolkit'
import * as darkMode from 'slicers/darkMode'
import * as alertMessage from 'slicers/alertSnackbar'
import * as shop from 'Redux/api/shop'
import * as contents from 'Redux/api/contents'
import * as images from 'api/contentsImages'
import * as shopImages from 'Redux/api/shopImages'
import * as filtration from 'api/filtration'
import { createWrapper } from 'next-redux-wrapper'

const store = configureStore({
  reducer: {
    [darkMode.name]: darkMode.reducer,
    [alertMessage.name]: alertMessage.reducer,
    [shop.reducerPath]: shop.reducer,
    [contents.reducerPath]: contents.reducer,
    [images.reducerPath]: images.reducer,
    [shopImages.reducerPath]: shopImages.reducer,
    [filtration.reducerPath]: filtration.reducer,
  },
  middleware: getDefault =>
    getDefault().concat([
      shop.middleware,
      contents.middleware,
      images.middleware,
      shopImages.middleware,
      filtration.middleware,
    ]),
})

export type AppStore = typeof store
export type RooState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const { withRedux, getStaticProps, getServerSideProps } = createWrapper(
  () => store
)
