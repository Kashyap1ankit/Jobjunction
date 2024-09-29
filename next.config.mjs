import path from "path";
import withPwa from "next-pwa";

/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["yjs"] = path.resolve("./", "node_modules/yjs");
    }
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
  reactStrictMode: false,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
      },
    ],
  },
};

const pwaConfig = withPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default pwaConfig(nextConfig);
