import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is 64 Studios' default; 82 is what Halden's photography is tuned to —
    // it holds the grain in the limewash walls without the weight of a step up.
    qualities: [75, 82],
  },

  /**
   * Permanent moves, so an old address stops being a second live URL for the
   * same thing rather than only pointing at it.
   *
   * Services is folded into Process, which now carries how a project runs, who
   * it is for and the fees on one page. Aldern & Voss is off the site: the
   * case study goes to the work, and the journal entry about its typography to
   * the journal. The concept site itself stays up on its own subdomain,
   * unlinked and noindexed, so those two URLs are the only ones that move.
   */
  async redirects() {
    return [
      { source: "/services", destination: "/process", permanent: true },
      { source: "/portfolio/aldern-voss", destination: "/portfolio", permanent: true },
      {
        source: "/journal/why-the-aldern-voss-specifications-are-set-in-mono",
        destination: "/journal",
        permanent: true,
      },
      // Halden's membership page is now the restoration. Both doors need it:
      // /halden/membership on the main host, and /membership at the root of
      // the subdomain, where the edge has already stripped the prefix.
      { source: "/halden/membership", destination: "/halden/the-restoration", permanent: true },
      { source: "/membership", destination: "/the-restoration", permanent: true },
    ];
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
