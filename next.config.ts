import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles image optimization natively
  images: {
    domains: [],
  },
  // Required for Vercel deployment with monorepo structure
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
