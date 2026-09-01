import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/config/portfolio";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import HaldenCaseStudy from "@/components/HaldenCaseStudy";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type PageParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Portfolio" };

  const title = project.title;
  const description = project.summary[0] ?? project.descriptor;
  const url = `/portfolio/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${title} — 64 Studios`,
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
      title: `${title} — 64 Studios`,
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

  if (project.slug === "halden") {
    return <HaldenCaseStudy project={project} />;
  }

  return <CaseStudyLayout project={project} />;
}
