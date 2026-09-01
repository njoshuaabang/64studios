import type { MetadataRoute } from "next";
import { projects } from "@/config/portfolio";
import { caseStudies } from "@/lib/clara/work";
import { writtenEntries } from "@/lib/clara/journal";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/portfolio", "/studio", "/contact"];
  // Halden and Clara Ashdown are sections of this site, not separate
  // deployments. Clara's two data-driven routes are listed from their own
  // sources, so a new case study or essay appears here without a second edit.
  const halden = ["/halden", "/halden/the-house", "/halden/membership", "/halden/enquire"];
  const clara = [
    "/clara-ashdown",
    "/clara-ashdown/about",
    "/clara-ashdown/work",
    "/clara-ashdown/journal",
    "/clara-ashdown/enquire",
    ...caseStudies.map((project) => `/clara-ashdown/work/${project.slug}`),
    ...writtenEntries.map((entry) => `/clara-ashdown/journal/${entry.essay.slug}`),
  ];

  return [
    ...pages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...[...halden, ...clara].map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
