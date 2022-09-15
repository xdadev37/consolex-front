import 'workbox-precaching';
import { setDefaultHandler } from 'workbox-routing';
import { clientsClaim } from 'workbox-core';
import { NetworkOnly } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

const ignored = self.__WB_MANIFEST;
setDefaultHandler(new NetworkOnly());
clientsClaim();
