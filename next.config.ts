import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  async rewrites() {
    return [
      { source: '/about', destination: '/?route=about' },
      { source: '/blogs', destination: '/?route=blogs' },
      { source: '/book-a-trip', destination: '/?route=book-a-trip' },
      { source: '/privacy-policy', destination: '/?route=privacy-policy' },
      { source: '/terms-conditions', destination: '/?route=terms-conditions' },
      { source: '/tours', destination: '/?route=tours' },
    ];
  },
};

export default nextConfig;
