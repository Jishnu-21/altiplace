/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.apple.com', 'cdn.prod.website-files.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
