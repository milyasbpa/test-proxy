/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: `/nexus/:path*`,
        destination: `https://uat-vision.alvisual.xyz/:path*`,
      },
      // {
      //   source: `/uvc/:path*`,
      //   destination: `http://192.168.18.189:8081/:path*`,
      // },
    ];
  },
};
module.exports = nextConfig;
// const withPWA = require("@ducanh2912/next-pwa").default({
//   dest: "public",
//   cacheOnFrontEndNav: true,
//   aggressiveFrontEndNavCaching: true,
//   reloadOnOnline: true,
//   swcMinify: true,
//   disable: process.env.NODE_ENV === "development",
//   workboxOptions: {
//     disableDevLogs: true,
//   },
// });
// module.exports = withPWA(nextConfig);
