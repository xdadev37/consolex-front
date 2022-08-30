import { useSyncExternalStore } from "react";
import store from "Redux/store";
import { createTheme } from "@mui/material/styles";
import type { MuiClasses } from "Types/EnvTypes";

const sx: MuiClasses<"root"> = {
  root: { direction: "rtl", ":lang": "fa-IR" },
};

export const useTheme = () => {
  const darkMode = useSyncExternalStore(
    store.subscribe,
    () => store.getState().darkMode
  );

  return createTheme({
    direction: "rtl",
    palette: {
      mode: darkMode ? "light" : "dark",
      primary: {
        main: darkMode ? "#fafafa" : "#ffd401",
      },
    },
  });
};

export default sx;
