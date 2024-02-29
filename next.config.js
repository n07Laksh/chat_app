/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "userprofileimgbucket.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/profile_images/**",
      },
    ],
  },
};

module.exports = nextConfig;
