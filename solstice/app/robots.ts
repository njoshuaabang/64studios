import type { MetadataRoute } from "next";

// A design proposal: nothing is to be crawled.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
