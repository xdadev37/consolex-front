import { useEffect, memo } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Workbox } from 'workbox-window'
import rtlCache from 'Constants/rtlCache'
import { ThemeProvider } from '@mui/system'
import { CssBaseline } from '@mui/material'
import theme from 'TSS/Header/Root.module'
import { withRedux } from 'Redux/store'
import { StyledEngineProvider } from '@mui/material/styles'
import { TssCacheProvider } from 'tss-react'
import { GoogleTagManager } from '@next/third-parties/google'
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
    <ThemeProvider {...{ theme }}>
      <TssCacheProvider value={emotionCache}>
        <GoogleTagManager gtmId='GTM-M6N8WFJT' />
        <StyledEngineProvider>
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />
        </StyledEngineProvider>
      </TssCacheProvider>
    </ThemeProvider>
  )
}

export default withRedux(memo(App))
