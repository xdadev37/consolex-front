import { memo, Suspense } from 'react';
import rtlCache from 'Constants/rtlCache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import theme from 'TSS/Header/Root.module';
import { wrapper } from 'Redux/store';
import Loading from 'Modules/Loading';
import type { NextPage } from 'next';
import type { Children } from 'Types/EnvTypes';

const Providers: NextPage<Children> = ({ children }) => (
  <Suspense fallback={<Loading open />}>
    <CacheProvider value={rtlCache}>
      <ThemeProvider {...{ theme }}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  </Suspense>
);

export default wrapper.withRedux(memo(Providers));
