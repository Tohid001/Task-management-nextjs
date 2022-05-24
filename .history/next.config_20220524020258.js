/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },

  env: {
    JSON_PORT: process.env.NEXT_PUBLIC_JSON_PORT,
  },
};

module.exports = nextConfig;
