"use client";

import Link from "next/link";
import { useState } from "react";
import Plate from "./Plate";
import { nashPath } from "@/lib/nash/paths";
import { collections, type Collection, type NashProject } from "@/lib/nash/projects";

type Filter = Collection | "All";

/**
 * The grid is the site's centre of gravity, so the only interaction here is
 * the filter and the spec plate — no scroll reveals, no stagger.
 *
 * The plate is a disclosure, not a link: the thumbnail button toggles it for
 * touch and keyboard, hover shows it on pointer devices, and the project name
 * beneath is what actually navigates. That keeps a tap from being a guess
 * between "tell me more" and "take me there".
 */
export default function PortfolioGrid({ projects }: { projects: NashProject[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<string | null>(null);

  const filters: Filter[] = ["All", ...collections];
  const shown = filter === "All" ? projects : projects.filter((p) => p.collection === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {filters.map((name) => {
          const active = filter === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setFilter(name)}
              aria-pressed={active}
              className={`border px-2 py-1 font-nash-body text-sm transition-colors duration-200 ${
                active
                  ? "border-nash-walnut bg-nash-walnut text-nash-plaster"
                  : "border-nash-ink/25 text-nash-ink hover:border-nash-brass hover:text-nash-brass"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-2 md:gap-8">
        {shown.map((project) => {
          const cover = project.images[0];
          const isOpen = open === project.slug;

          return (
            <li key={project.slug} className="group">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : project.slug)}
                aria-expanded={isOpen}
                aria-controls={`spec-${project.slug}`}
                aria-label={`Specification for ${project.name}`}
                className="block w-full"
              >
                <Plate
                  src={cover.src}
                  alt={cover.alt}
                  sizes="(max-width: 768px) 100vw, 46vw"
                  className="cursor-pointer"
                >
                  <div
                    id={`spec-${project.slug}`}
                    className={`absolute inset-0 flex flex-col justify-end gap-1 bg-nash-walnut/85 p-3 text-left transition-opacity duration-200 md:p-4 ${
                      isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Spec label="Location" value={project.location} />
                    <Spec label="Scope" value={project.scope} />
                    <Spec label="Duration" value={project.duration} />
                  </div>
                </Plate>
              </button>

              <h2 className="mt-2 font-nash-display text-lg text-nash-ink">
                <Link
                  href={nashPath(`/portfolio/${project.slug}`)}
                  className="transition-colors duration-200 hover:text-nash-brass"
                >
                  {project.name}
                </Link>
              </h2>
              <p className="font-nash-body text-sm text-nash-ink/70">{project.collection}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <p className="font-nash-body text-sm leading-snug text-nash-plaster">
      <span className="text-nash-plaster/60">{label} </span>
      {value}
    </p>
  );
}
