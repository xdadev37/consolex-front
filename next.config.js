/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'consolex.shop', 'consolex.ir']
  },
};

module.exports = nextConfig;
