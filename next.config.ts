import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nexus-shiftops",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
