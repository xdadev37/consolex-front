import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import 'CSS/Font.css';
import type { AppProps } from 'next/app';
config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
