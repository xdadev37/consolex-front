import { configureStore } from "@reduxjs/toolkit";
import darkMode from "slicers/darkMode";
import alertMessage from "slicers/alertSnackbar";

const store = configureStore({
  reducer: {
    [darkMode.name]: darkMode.reducer,
    [alertMessage.name]: alertMessage.reducer,
  },
});

export default store;
