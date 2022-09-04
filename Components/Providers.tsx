import { memo } from 'react';
import rtlCache from 'Constants/rtlCache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { useTheme } from 'TSS/Header/Root.module';
import { wrapper } from 'Redux/store';
import type { NextPage } from 'next';
import type { Children } from 'Types/EnvTypes';

const Providers: NextPage<Children> = ({ children }) => {
  const theme = useTheme();

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider {...{ theme }}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default wrapper.withRedux(memo(Providers));
