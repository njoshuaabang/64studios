import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/clara/PageHeader";
import Prose from "@/components/clara/Prose";
import { caseStudies, firstSentence, getCaseStudy } from "@/lib/clara/work";
import { claraPath } from "@/lib/clara/paths";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: firstSentence(project.opening),
    openGraph: {
      title: project.title,
      description: firstSentence(project.opening),
      images: [{ url: project.cover.src }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-clara-content px-[var(--gutter)] pb-[var(--space-section)]">
      <PageHeader title={project.title} meta={project.location} />

      <figure className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority
          quality={82}
          sizes="(min-width: 1180px) 1180px, 100vw"
          className="object-cover saturate-[0.94]"
        />
      </figure>

      <div className="grid gap-6 pt-8 md:grid-cols-[1fr_0.5fr] md:gap-10">
        <Prose opening={project.opening} body={project.body} />

        <figure className="relative aspect-[4/5] overflow-hidden md:self-start">
          <Image
            src={project.detail.src}
            alt={project.detail.alt}
            fill
            quality={82}
            sizes="(min-width: 760px) 32vw, 100vw"
            className="object-cover saturate-[0.94]"
          />
        </figure>
      </div>

      <Link
        href={claraPath("/work")}
        className="mt-8 inline-block border-b border-clara-stone pb-px text-clara-nav text-clara-ink transition-[letter-spacing] duration-300 ease-out hover:tracking-[0.03em]"
      >
        ← Back to work
      </Link>
    </article>
  );
}
