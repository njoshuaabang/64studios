import Image from "next/image";
import TransitionLink from "./TransitionLink";
import VisitSiteButton from "./VisitSiteButton";
import type { CaseStudyImage, Project } from "@/config/portfolio";

/**
 * The only case-study layout. Every project renders through this and nothing
 * else, so section spacing, heading sizes, image widths and the specs block
 * cannot differ between one project and the next — there is no second
 * component in which they could drift.
 *
 * The rhythm is fixed: situation, its images, approach, its images, specs. A
 * project with no images simply skips those bands; the spacing either side
 * stays the same, because it belongs to the sections rather than to the
 * images.
 */
const SHELL = "mx-auto w-full max-w-3xl px-4 md:px-6";
const SECTION = "mt-16 md:mt-20";
const HEADING = "font-body text-[11px] uppercase tracking-[0.25em] text-ink";
const PROSE = "mt-6 max-w-[62ch] font-body text-base leading-[1.7] text-ink";

function ImageBand({ images }: { images: CaseStudyImage[] }) {
  if (images.length === 0) return null;

  return (
    <div className={`${SHELL} ${SECTION} flex flex-col gap-6 md:gap-8`}>
      {images.map((image) => (
        <div key={image.src} className="relative aspect-[16/10] w-full overflow-hidden bg-bone">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default function CaseStudyLayout({ project }: { project: Project }) {
  const situationImages = project.images.filter((i) => i.placement === "situation");
  const approachImages = project.images.filter((i) => i.placement === "approach");

  return (
    <article className="pb-20 pt-16 md:pt-20">
      <header className={SHELL}>
        <TransitionLink href="/portfolio" className={HEADING}>
          ← Selected Work
        </TransitionLink>

        <h1 className="mt-6 font-display text-3xl font-bold text-ink md:text-5xl">
          {project.title}
        </h1>
        {/* A real h2, not a styled div: it is the page's keyword-bearing line. */}
        <h2 className="mt-3 max-w-[46ch] font-body text-base leading-[1.6] text-ink md:text-lg">
          {project.subtitle}
        </h2>
        <VisitSiteButton url={project.url} className="mt-8" />
      </header>

      {project.cover ? (
        <div className={`${SHELL} ${SECTION}`}>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              preload
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <section className={`${SHELL} ${SECTION}`}>
        <h2 className={HEADING}>{project.situationHeading}</h2>
        <p className={PROSE}>{project.situation}</p>
      </section>

      <ImageBand images={situationImages} />

      <section className={`${SHELL} ${SECTION}`}>
        <h2 className={HEADING}>{project.approachHeading}</h2>
        {project.approach.map((paragraph) => (
          <p key={paragraph} className={PROSE}>
            {paragraph}
          </p>
        ))}
      </section>

      <ImageBand images={approachImages} />

      <dl className={`${SHELL} ${SECTION} border-t border-bone pt-6`}>
        <dt className="sr-only">Specification</dt>
        {project.specs.map((spec) => (
          <dd key={spec} className="font-body text-[11px] uppercase tracking-[0.2em] text-ink">
            {spec}
          </dd>
        ))}
      </dl>

      <p className={`${SHELL} mt-10 font-body text-xs text-ink`}>{project.attribution}</p>
    </article>
  );
}
