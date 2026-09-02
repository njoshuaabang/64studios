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
 * The thumbnail is the link to the case study, and the spec plate rides on top
 * of it: hovering or focusing shows the plate, clicking opens the project.
 *
 * On touch there is no hover to reveal it with, and making the first tap a
 * disclosure and the second a navigation is the pattern where nobody knows
 * which one they are about to get. So on pointer-coarse devices the plate is
 * simply always shown — see the `hover: none` rule in globals.css — and a tap
 * means the same thing everywhere: open the project.
 */
export default function PortfolioGrid({ projects }: { projects: NashProject[] }) {
  const [filter, setFilter] = useState<Filter>("All");

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

          return (
            <li key={project.slug}>
              <Link
                href={nashPath(`/portfolio/${project.slug}`)}
                aria-label={project.name}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nash-brass"
              >
                <Plate src={cover.src} alt={cover.alt} sizes="(max-width: 768px) 100vw, 46vw">
                  <div
                    data-nash-spec
                    className="absolute inset-0 flex flex-col justify-end gap-1 bg-nash-walnut/85 p-3 text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:p-4"
                  >
                    <Spec label="Location" value={project.location} />
                    <Spec label="Scope" value={project.scope} />
                    <Spec label="Duration" value={project.duration} />
                  </div>
                </Plate>
              </Link>

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
