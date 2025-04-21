/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      }
    ]
  },
  env: {
    APP_URL: process.env.APP_URL,
  },
  reactStrictMode: false,
  transpilePackages: ['geist']
};

module.exports = nextConfig;
