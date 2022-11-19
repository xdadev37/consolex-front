import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'

const isClient = typeof document !== 'undefined'
const rtlCache = createCache({
  key: 'mui-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
  prepend: true,
  insertionPoint:
    (isClient &&
      document.querySelector<HTMLMetaElement>(
        'meta[name="emotion-insertion-point"]'
      )) ||
    undefined,
})

export default rtlCache
