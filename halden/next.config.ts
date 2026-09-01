import type { NextConfig } from "next";
import { basePath } from "./lib/basePath";

const nextConfig: NextConfig = {
  // Served under a sub-path so another domain can rewrite /halden onto this
  // deployment. Both are set deliberately: basePath handles routing and links,
  // assetPrefix pins where the _next chunks are fetched from.
  basePath,
  assetPrefix: basePath,

  // Standalone, the app now lives at <deployment>/halden, so send the bare
  // root there rather than 404ing. Opted out of basePath or it would rewrite
  // the source to /halden and never match.
  async redirects() {
    return [
      { source: "/", destination: basePath, permanent: false, basePath: false },
    ];
  },

  // Keeps the dev overlay out of screenshots.
  devIndicators: false,
  // This project sits inside another Next.js repo, so the root has to be
  // stated: left to inference, both of these resolve to the parent's lockfile
  // directory and pull the wrong tree into the build.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  images: {
    // The house photography is warm and low-contrast; 82 holds the grain in the
    // limewash walls without shipping the weight of a higher quality step.
    qualities: [82],
  },
};

export default nextConfig;
