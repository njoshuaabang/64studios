"use client";

import Image from "next/image";
import TransitionLink from "./TransitionLink";
import type { Project } from "@/config/portfolio";

export default function ProjectCard({
  project,
  preload = false,
}: {
  project: Project;
  preload?: boolean;
}) {
  const { cover } = project;

  return (
    <TransitionLink href={`/portfolio/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone transition-opacity duration-400 ease-out group-hover:opacity-80">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            preload={preload}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <h2 className="font-display text-lg font-semibold text-ink">{project.title}</h2>
        <p className="font-body text-sm text-ink">{project.subtitle}</p>
      </div>
    </TransitionLink>
  );
}
