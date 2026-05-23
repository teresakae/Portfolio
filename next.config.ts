import type { NextConfig } from "next";
import os from "os";


const localIps = Object.values(os.networkInterfaces())
  .flat()
  .filter((iface) => iface?.family === "IPv4" && !iface?.internal)
  .map((iface) => iface?.address as string);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  allowedDevOrigins: localIps, 
};

export default nextConfig;