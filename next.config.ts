import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the floating route badge in the bottom corner during `next dev`.
  // Compile and runtime errors still surface in the full-screen overlay — this
  // only removes the always-on indicator, not the error reporting.
  devIndicators: false,

  experimental: {
    // Enables `src/app/global-not-found.tsx`. Needed because the root layout
    // sits under a dynamic segment (`app/[lang]/layout.tsx`), so a URL that
    // matches no route has no layout to render a `not-found.tsx` inside.
    globalNotFound: true,
  },

  images: {
    remotePatterns: [
      // The media library: every photograph uploaded in the panel is served
      // from the R2 bucket, so `next/image` has to be told it is allowed to
      // optimise them. `pub-*.r2.dev` is R2's own public hostname; a custom
      // bucket domain goes here too.
      { protocol: "https", hostname: "*.r2.dev", pathname: "/**" },
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com", pathname: "/**" },
      // Demo media hosts, still used by the built-in fallback data.
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
