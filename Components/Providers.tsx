import { memo, Suspense } from 'react'
import rtlCache from 'Constants/rtlCache'
import { ThemeProvider } from '@mui/system'
import { CssBaseline } from '@mui/material'
import theme from 'TSS/Header/Root.module'
import { withRedux } from 'Redux/store'
import { StyledEngineProvider } from '@mui/material/styles'
import { TssCacheProvider } from 'tss-react'
import Loading from 'Modules/Loading'
import type { NextPage } from 'next'
import type { Children } from 'Types/EnvTypes'

const Providers: NextPage<Children> = ({ children }) => (
  <Suspense fallback={<Loading open />}>
    <ThemeProvider {...{ theme }}>
      <TssCacheProvider value={rtlCache}>
        <StyledEngineProvider injectFirst>
          <CssBaseline enableColorScheme />
          {children}
        </StyledEngineProvider>
      </TssCacheProvider>
    </ThemeProvider>
  </Suspense>
)

export default withRedux(memo(Providers))
