const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        protocol: 'https',
      },
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
