import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
