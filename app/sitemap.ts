import type { MetadataRoute } from "next";
import { projects } from "@/config/portfolio";
import { entries } from "@/config/journal";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/portfolio", "/services", "/process", "/studio", "/journal", "/contact"];

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
    // Journal entries carry their own published date rather than the build
    // date: a crawler seeing lastModified move on every deploy learns nothing
    // from it.
    ...entries.map((entry) => ({
      url: `${SITE_URL}/journal/${entry.slug}`,
      lastModified: new Date(entry.published),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
