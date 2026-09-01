import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is 64 Studios' default; 82 is what Halden's photography is tuned to —
    // it holds the grain in the limewash walls without the weight of a step up.
    qualities: [75, 82],
  },

  /**
   * Aldern & Voss is a Vite single-page app built to `public/aldern-voss/`, so
   * unlike Halden it is not a route group — it is static files plus a client
   * router. These run as `fallback`, which is checked only after the
   * filesystem: real assets under /aldern-voss/ serve themselves, and anything
   * left over is handed to the SPA's index.html for react-router to resolve.
   */
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        { source: "/aldern-voss", destination: "/aldern-voss/index.html" },
        { source: "/aldern-voss/:path*", destination: "/aldern-voss/index.html" },
      ],
    };
  },
};

export default nextConfig;
