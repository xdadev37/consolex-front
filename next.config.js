const withWorkbox = require('next-with-workbox')

/** @type {import('next').NextConfig} */

module.exports = withWorkbox({
  reactStrictMode: true,
  staticPageGenerationTimeout: 99999,
  swcMinify: true,
  images: {
    domains: ['localhost', 'www.consolex.ir'],
  },
  workbox: {
    swSrc: './sw.ts',
  },
})
