import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/clara/PageHeader";
import { caseStudies, firstSentence } from "@/lib/clara/work";
import { claraPath } from "@/lib/clara/paths";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A small number of projects, each told in full rather than reduced to before-and-after. Stone farmhouses and converted barns in Gloucestershire and Oxfordshire.",
};

export default function WorkIndex() {
  return (
    <div className="mx-auto max-w-clara-content px-[var(--gutter)] pb-[var(--space-section)]">
      <PageHeader
        title="Work"
        intro="A small number of projects, each told in full rather than reduced to before-and-after."
      />

      {/*
        A list, not a grid of equal-weight thumbnails: one project to a row,
        each with a single dominant photograph. Case studies carry no
        numbering — they are not a sequence the way the journal is.
      */}
      <ul>
        {caseStudies.map((project) => (
          <li key={project.slug} className="border-t border-clara-stone/50">
            <Link href={claraPath(`/work/${project.slug}`)} className="group block py-6">
              <div className="grid items-center gap-4 md:grid-cols-[0.9fr_1.1fr] md:gap-8">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    quality={82}
                    sizes="(min-width: 760px) 45vw, 100vw"
                    className="object-cover saturate-[0.94]"
                  />
                </div>

                <div>
                  <h2 className="font-clara-display text-clara-title font-light [font-optical-sizing:auto]">
                    <span className="inline-block border-b border-transparent pb-px transition-[letter-spacing] duration-300 ease-out group-hover:tracking-[0.01em] group-hover:border-clara-stone">
                      {project.title}
                    </span>
                  </h2>
                  <p className="pt-1 text-clara-meta text-clara-stone">{project.location}</p>
                  <p className="max-w-[46ch] pt-3 font-clara-display text-clara-base font-light leading-[1.6] text-clara-ink/85">
                    {firstSentence(project.opening)}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
