import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow mobile testing on the local network (prevents Next.js from blocking dev scripts)
  allowedDevOrigins: ['192.168.1.8', '192.168.1.0', '192.168.1.2', '192.168.1.5', '192.168.1.10', '10.0.0.1', '10.0.0.2', '10.0.0.5', '10.0.0.10', '10.0.0.15', '172.20.10.2', '172.20.10.3', '172.20.10.4', '172.20.10.5', '172.20.10.6', '172.20.10.7', '172.20.10.8', '172.20.10.9', '172.20.10.10', '172.20.10.11', '172.20.10.12', '172.20.10.13', '172.20.10.14', '172.20.10.15'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
