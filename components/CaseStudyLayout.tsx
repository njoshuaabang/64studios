import Image from "next/image";
import TransitionLink from "./TransitionLink";
import VisitSiteButton from "./VisitSiteButton";
import type { Project } from "@/config/portfolio";

export default function CaseStudyLayout({ project }: { project: Project }) {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 pt-16 md:px-6 md:pt-20">
      <TransitionLink
        href="/portfolio"
        className="font-body text-xs uppercase tracking-[0.25em] text-ink"
      >
        ← Portfolio
      </TransitionLink>

      <header className="mt-6">
        <h1 className="font-display text-3xl font-bold text-ink md:text-5xl">{project.title}</h1>
        <p className="mt-2 font-body text-sm text-ink md:text-base">{project.descriptor}</p>
      </header>

      {/* Projects without a cover keep the bone plate, as they always have. */}
      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-bone">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        ) : null}
      </div>

      <dl className="mt-8 flex flex-wrap gap-8 border-t border-bone pt-6">
        <div>
          <dt className="font-body text-[10px] uppercase tracking-[0.25em] text-ink">Year</dt>
          <dd className="mt-1 font-display text-sm text-ink">{project.year}</dd>
        </div>
        <div>
          <dt className="font-body text-[10px] uppercase tracking-[0.25em] text-ink">Scope</dt>
          <dd className="mt-1 font-display text-sm text-ink">{project.scope.join(", ")}</dd>
        </div>
      </dl>

      <VisitSiteButton url={project.url} className="mt-6" />

      <div className="mt-8 flex flex-col gap-4">
        {project.summary.map((paragraph) => (
          <p key={paragraph} className="font-body text-base leading-relaxed text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
