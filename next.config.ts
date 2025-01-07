/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img-c.udemycdn.com',
        pathname: '/course/**',
      },
    ],
  },
}

module.exports = nextConfig

