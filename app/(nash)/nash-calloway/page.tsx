import type { Metadata } from "next";
import Link from "next/link";
import Entrance from "@/components/nash/Entrance";
import Hero from "@/components/nash/Hero";
import Nav from "@/components/nash/Nav";
import { nashPath } from "@/lib/nash/paths";
import { nashBase } from "@/lib/nash/server";

export const metadata: Metadata = {
  title: { absolute: "Nash Calloway Design" },
};

/**
 * Four finished projects, ordered so no two consecutive frames share a
 * subject: a dissolve between two photographs of the same kind of thing reads
 * as one doubled image rather than a change of project. Stone Canyon's
 * interior sits between the two coastal exteriors for that reason.
 *
 * Each frame is dimmed 30% by its own brightness filter, which clears WCAG AA
 * on one frame of the four — the numbers are in
 * Hero.tsx. The set is chosen for subject variety rather than for contrast;
 * Grosvenor Square is out for a separate reason — see the note on its project
 * images.
 */
const frames = [
  {
    src: "/nash/images/carbon-after.jpg",
    alt: "A low modern house behind palms, its glazed beach elevation open to the light.",
  },
  {
    src: "/nash/images/stone-after.jpg",
    alt: "A pine-panelled room under a beamed ceiling, the bay window open to trees.",
  },
  {
    src: "/nash/images/serena-after.jpg",
    alt: "Terraced buildings stepping down a cliff face above the sea.",
  },
  {
    src: "/nash/images/holland-after.jpg",
    alt: "The villa seen across its garden, the garden front open to the lawn.",
  },
];

export default async function NashHomePage() {
  const base = await nashBase();

  return (
    <main id="main-content" tabIndex={-1} className="relative flex min-h-[100dvh] flex-col">
      <Entrance />
      <Hero frames={frames} />

      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <Nav transparent />

        <div className="flex flex-1 flex-col justify-end px-4 pb-10 md:px-8 md:pb-14">
          {/*
            The hero carries no text of its own now — the photography and the
            one button are the whole of it. The name still has to exist as the
            page's heading, so it is here for assistive tech and search, and
            visible in the nav rather than twice over.
          */}
          <h1 className="sr-only">Nash Calloway Design</h1>

          <Link
            href={nashPath(base, "/portfolio")}
            data-nash-cta
            className="inline-flex w-full max-w-[12rem] items-center justify-center self-center border border-nash-plaster px-8 py-[12px] font-nash-body text-sm uppercase tracking-wide text-nash-plaster transition-colors duration-200 hover:bg-nash-plaster hover:text-nash-ink"
          >
            Enter
          </Link>
        </div>
      </div>
    </main>
  );
}
