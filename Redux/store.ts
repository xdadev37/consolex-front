import { configureStore } from '@reduxjs/toolkit'
import darkMode from 'slicers/darkMode'
import alertMessage from 'slicers/alertSnackbar'
import shop from 'Redux/api/shop'
import contents from 'Redux/api/contents'
import images from 'api/contentsImages'
import shopImages from 'Redux/api/shopImages'
import filtration from 'api/filtration'
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

export const { withRedux, getStaticProps } = createWrapper(() => store)
export default store
