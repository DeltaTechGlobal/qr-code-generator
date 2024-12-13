/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/qr-code-generator',
    assetPrefix: '/qr-code-generator/',
  } : {}),
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