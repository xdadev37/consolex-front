import { configureStore } from '@reduxjs/toolkit';
import darkMode from 'slicers/darkMode';
import alertMessage from 'slicers/alertSnackbar';
import shop from 'Redux/api/shop';
import contents from 'Redux/api/contents';

const store = configureStore({
  reducer: {
    [darkMode.name]: darkMode.reducer,
    [alertMessage.name]: alertMessage.reducer,
    [shop.reducerPath]: shop.reducer,
    [contents.reducerPath]: contents.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat([shop.middleware, contents.middleware]),
});

export default store;
