import { useEffect, memo } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Workbox } from 'workbox-window'
import rtlCache from 'Constants/rtlCache'
import { ThemeProvider } from '@mui/system'
import { CssBaseline } from '@mui/material'
import theme from 'TSS/Header/Root.module'
import { withRedux } from 'Redux/store'
import { StyledEngineProvider } from '@mui/material/styles'
import Head from 'next/head'
import { TssCacheProvider } from 'tss-react'
import 'CSS/Font.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { EmotionCache } from '@emotion/react'
import type { AppProps } from 'next/app'

config.autoAddCss = false
const regSW = () => {
  new Workbox('/sw.js').register()
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const App = ({ Component, emotionCache = rtlCache, pageProps }: MyAppProps) => {
  useEffect(regSW, [])
  return (
    <TssCacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <ThemeProvider {...{ theme }}>
        <StyledEngineProvider injectFirst>
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />
        </StyledEngineProvider>
      </ThemeProvider>
    </TssCacheProvider>
  )
}

export default withRedux(memo(App))
