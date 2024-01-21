/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

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
const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // scope: "/app",
  // sw: "service-worker.js",
  //...
});
export default withPWA(nextConfig);
