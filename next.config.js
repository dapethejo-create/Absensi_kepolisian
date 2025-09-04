/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config; // tetap pakai webpack biasa
  },
  experimental: {
    turbo: false // matiin Turbopack biar build lancar di Vercel
  }
}

module.exports = nextConfig;
