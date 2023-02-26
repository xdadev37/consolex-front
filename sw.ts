import 'workbox-precaching'
import axios from 'axios'
import appSettings from 'AppSettings'
import { enable as preNavEnable } from 'workbox-navigation-preload'
import { setDefaultHandler } from 'workbox-routing'
import { clientsClaim } from 'workbox-core'
import { CacheFirst } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

const ignored = self.__WB_MANIFEST
preNavEnable()
setDefaultHandler(
  new CacheFirst({
    plugins: [
      {
        handlerWillRespond: async ({ request }) =>
          request.destination === 'image'
            ? caches.open('cache').then(c =>
                c.match(request.url).then(
                  r =>
                    r ||
                    axios({
                      baseURL: appSettings.baseUrl,
                      url: request.url,
                      responseType: 'blob',
                    }).then(res => res.data)
                )
              )
            : axios({
                baseURL: appSettings.baseUrl,
                url: request.url,
              }).then(res => res.data),
      },
    ],
  })
)
clientsClaim()
