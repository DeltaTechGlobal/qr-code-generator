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
    // Handle punycode deprecation warning
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }

    // Suppress specific module warnings
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { message: /Critical dependency: the request of a dependency is an expression/ },
      /The 'punycode' module is deprecated/,
    ];

    return config;
  },
}

module.exports = nextConfig 