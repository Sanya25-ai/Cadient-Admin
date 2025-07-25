/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/atao/api/:path*',
      },
    ]
  },
  env: {
    LEGACY_BASE: process.env.LEGACY_BASE || 'http://localhost:8080/atao',
  },
  reactStrictMode: false,
}

export default nextConfig
