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
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/stake',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
