/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, {isServer, webpack}) => {
    // if (isServer) {

    // }
    console.log(JSON.stringify(config.module.rules, null, 2));
    return config;
  },
};

module.exports = nextConfig;
