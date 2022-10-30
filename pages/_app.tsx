import { useEffect } from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Workbox } from 'workbox-window'
import 'CSS/Font.css'
import type { AppProps } from 'next/app'

config.autoAddCss = false
const regSW = () => {
  new Workbox('/sw.js').register()
}

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(regSW, [])
  return <Component {...pageProps} />
}

export default App
