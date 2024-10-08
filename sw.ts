import 'workbox-precaching'
import { enable as preNavEnable } from 'workbox-navigation-preload'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { clientsClaim } from 'workbox-core'
import { CacheFirst, NetworkOnly } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

const ignored = self.__WB_MANIFEST

preNavEnable()
const imageRoute = new NavigationRoute(props =>
  props.request.destination === 'image'
    ? new CacheFirst().handle(props)
    : new NetworkOnly().handle(props)
)
registerRoute(imageRoute)
clientsClaim()
