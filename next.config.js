/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: './',
  basePath: '',
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
}

module.exports = nextConfig 