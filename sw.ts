import 'workbox-precaching'
import axios from 'axios'
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
        handlerWillStart: async ({ request }) =>
          request.destination === 'image'
            ? caches
                .open('cache')
                .then(c =>
                  c
                    .match(request.url)
                    .then(
                      r =>
                        r ||
                        axios({ url: request.url }).then(res =>
                          c.put(request, res.data).then(() => res.data)
                        )
                    )
                )
            : undefined,
      },
    ],
  })
)
clientsClaim()
