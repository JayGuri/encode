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
  // Enable static exports for improved performance on Vercel
  output: 'export',
}

module.exports = nextConfig

