/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/qr-code-generator', // Replace with your repository name
  assetPrefix: '/qr-code-generator/', // Replace with your repository name
}

module.exports = nextConfig 