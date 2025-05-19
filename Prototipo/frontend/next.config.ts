import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {
    remotePatterns: [
      new URL("https://www.themoviedb.org/t/p/**"),
      new URL("https://media.themoviedb.org/t/p/**"),
    ],
  },
};

export default nextConfig;
