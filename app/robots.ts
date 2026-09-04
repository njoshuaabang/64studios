import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * The main host's robots.txt only. Every demo subdomain gets a blanket
 * disallow from middleware.ts instead, consistent with the noindex those
 * pages already carry — see the /robots.txt branch there.
 *
 * Nothing here blocks AI crawlers — GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended, or any other named agent. Getting cited by AI assistants
 * is a stated goal, and a single "*" rule that allows everything except /api/
 * is what lets that happen without a future edit singling any of them out
 * for a narrower rule by mistake.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
