import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@iconify/react": path.resolve(
        __dirname,
        "node_modules/@iconify/react/dist/offline"
      ),
    };

    return config;
  },
};

export default nextConfig;
