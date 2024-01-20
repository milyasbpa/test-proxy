/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: `/nexus/:path*`,
        destination: `https://uat-vision.alvisual.xyz/:path*`,
      },
    ];
  },
};

export default nextConfig;
