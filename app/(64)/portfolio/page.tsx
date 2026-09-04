import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/config/portfolio";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "64 Studios", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Selected Work", item: `${SITE_URL}/portfolio` },
  ],
};

export const metadata: Metadata = {
  title: { absolute: "Selected Work — 64 Studios" },
  description:
    "Brand identity and website design projects by 64 Studios, a branding agency building custom, hand-coded websites.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Selected Work — 64 Studios",
    description:
      "Brand identity and website design projects by 64 Studios, a branding agency building custom, hand-coded websites.",
  },
};

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-16 md:px-6 md:pt-20">
      <JsonLd data={breadcrumb} />
      <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Selected Work</h1>
      <p className="mt-4 max-w-[45ch] font-body text-base leading-relaxed text-ink">
        Identities and websites for brands that would rather not blend in.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-14 md:gap-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} preload={i === 0} />
        ))}
      </div>
    </main>
  );
}
