import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Demo media hosts. Add your own CDN / DAM before going live.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
