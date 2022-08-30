import { memo } from "react";
import { Provider } from "react-redux";
import store from "Redux/store";
import rtlCache from "Constants/rtlCache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { useTheme } from "TSS/Header/Root.module";
import type { NextPage } from "next";
import type { Children } from "Types/EnvTypes";

const Providers: NextPage<Children> = ({ children }) => {
  const theme = useTheme();

  return (
    <Provider {...{ store }}>
      <CacheProvider value={rtlCache}>
        <ThemeProvider {...{ theme }}>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
};

export default memo(Providers);
