import 'workbox-precaching'
import { enable as preNavEnable } from 'workbox-navigation-preload'
import { registerRoute, Route } from 'workbox-routing'
import { clientsClaim } from 'workbox-core'
import { CacheFirst } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

const ignored = self.__WB_MANIFEST
preNavEnable()
const imageRoute = new Route(
  ({ request, sameOrigin }) => sameOrigin && request.destination === 'image',
  new CacheFirst()
)
registerRoute(imageRoute)
clientsClaim()
