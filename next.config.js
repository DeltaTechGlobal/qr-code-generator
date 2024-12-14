/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['generateqrcode.online'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'generateqrcode.online'
      },
      {
        protocol: 'https',
        hostname: 'generateqrcode.online'
      }
    ]
  },
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    // Suppress the warning
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { module: /node_modules\/punycode\/punycode\.js/ },
    ]
    return config
  },
}

module.exports = nextConfig 