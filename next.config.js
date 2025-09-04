/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config;
  },
  experimental: {
    turbo: false,
  },
};

module.exports = nextConfig;
