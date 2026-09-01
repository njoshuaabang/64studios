import type { MetadataRoute } from "next";
import { projects } from "@/config/portfolio";
import { projects as nashProjects } from "@/lib/nash/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/portfolio", "/studio", "/contact"];
  // Halden and Nash Calloway are sections of this site, not separate
  // deployments. Nash's project routes are listed from their own source, so a
  // tenth project would appear here without a second edit.
  const halden = ["/halden", "/halden/the-house", "/halden/membership", "/halden/enquire"];
  const nash = [
    "/nash-calloway",
    "/nash-calloway/portfolio",
    "/nash-calloway/about",
    "/nash-calloway/enquire",
    ...nashProjects.map((project) => `/nash-calloway/portfolio/${project.slug}`),
  ];

  return [
    ...pages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...[...halden, ...nash].map((path) => ({
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
