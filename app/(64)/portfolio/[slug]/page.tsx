import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/config/portfolio";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type PageParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Portfolio" };

  const title = `${project.title} — 64 Studios`;
  const description = project.subtitle;
  const url = `/portfolio/${project.slug}`;

  return {
    // Absolute, or the "%s — 64 Studios" template appends a second time.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: project.cover
        ? [
            {
              url: project.cover.src,
              width: project.cover.width,
              height: project.cover.height,
              alt: project.cover.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: project.cover ? "summary_large_image" : "summary",
      title,
      description,
      images: project.cover ? [project.cover.src] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: PageParams) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const url = `${SITE_URL}/portfolio/${project.slug}`;

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.subtitle,
    about: project.subtitle,
    creator: { "@type": "Organization", name: "64 Studios", url: SITE_URL },
    // By convention every project's specs array ends with its year — the one
    // place that fact already lives, rather than a new field duplicating it.
    dateCreated: project.specs.at(-1),
    image: project.cover ? `${SITE_URL}${project.cover.src}` : undefined,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "64 Studios", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Selected Work", item: `${SITE_URL}/portfolio` },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={creativeWork} />
      <JsonLd data={breadcrumb} />
      <CaseStudyLayout project={project} />
    </>
  );
}
