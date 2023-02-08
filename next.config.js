const withWorkbox = require('next-with-workbox')

/** @type {import('next').NextConfig} */

module.exports = withWorkbox({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'consolex.ir'],
  },
  workbox: {
    swSrc: './sw.ts',
  },
})
