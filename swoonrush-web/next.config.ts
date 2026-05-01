import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Set basePath conditionally for GitHub Pages deployment
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
