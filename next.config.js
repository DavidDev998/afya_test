/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ['assets.coingecko.com', 'coin-images.coingecko.com'],
  },
}

module.exports = nextConfig
