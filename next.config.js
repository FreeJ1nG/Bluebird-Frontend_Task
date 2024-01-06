/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: ['www.bluebirdgroup.com'],
  },
};

module.exports = nextConfig;
