/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    loader: 'akamai',
    path: process.env.NEXT_PUBLIC_BASE_PATH+'/',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  reactStrictMode: true,
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
