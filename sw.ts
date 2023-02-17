import 'workbox-precaching'
// import { enable as preNavEnable } from 'workbox-navigation-preload'
// import { setDefaultHandler } from 'workbox-routing'
// import { clientsClaim } from 'workbox-core'
// import { NetworkOnly } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

const ignored = self.__WB_MANIFEST
// preNavEnable()
// setDefaultHandler(new NetworkOnly({ networkTimeoutSeconds: 30000 }))
// clientsClaim()
