import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // images.md: AVIF and WebP at quality 82.
  images: { formats: ["image/avif", "image/webp"], qualities: [82] },
  turbopack: {
    // This app sits inside the 64 Studios repo; keep Turbopack off the parent project.
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
