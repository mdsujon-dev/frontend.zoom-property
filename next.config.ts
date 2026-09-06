import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the floating route badge in the bottom corner during `next dev`.
  // Compile and runtime errors still surface in the full-screen overlay — this
  // only removes the always-on indicator, not the error reporting.
  devIndicators: false,

  images: {
    // Demo media hosts. Add your own CDN / DAM before going live.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
