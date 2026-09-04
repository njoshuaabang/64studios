import type { MetadataRoute } from "next";
import { projects } from "@/config/portfolio";
import { SITE_URL } from "@/lib/site";

/**
 * The main host's sitemap only. Halden, Nash Calloway and Aldern & Voss are
 * noindex demo brands living on their own subdomains (see lib/sites.ts and
 * middleware.ts) — they are deliberately absent here, and deliberately have
 * no sitemap of their own: a sitemap for a noindex site is a contradictory
 * signal, so demo hosts 404 on /sitemap.xml rather than serving one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/portfolio", "/studio", "/contact"];

  return [
    ...pages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
