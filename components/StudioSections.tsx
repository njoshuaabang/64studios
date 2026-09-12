"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import TransitionLink from "./TransitionLink";
import { UNDERLINE } from "@/lib/underline";

const LABEL = "font-body text-[12px] uppercase tracking-[0.5em] text-ink";
const PROSE = "max-w-[58ch] font-body text-base leading-[1.6] text-ink";

export default function StudioSections() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      container.querySelectorAll<HTMLElement>("[data-reveal]").forEach((block) => {
        const items = block.querySelectorAll<HTMLElement>("[data-reveal-item]");
        // Movement only. These used to start at autoAlpha 0, which left every
        // section below the fold invisible until it was scrolled to — to a
        // reader, to a screen reader and to anything reading the rendered
        // page. Nothing here rests hidden now: the copy is legible from first
        // paint and the entrance is a rise into place.
        gsap.set(items, { y: 20 });
        gsap.to(items, {
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: { trigger: block, start: "top 78%", once: true },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <main id="main-content" tabIndex={-1} ref={containerRef} className="mx-auto max-w-5xl px-4 md:px-6">
      <section aria-labelledby="mission" data-reveal className="pb-[2vh] pt-[6vh]">
        <div data-reveal-item aria-hidden="true" className="h-px w-12 bg-bone" />
        <h1
          id="mission"
          data-reveal-item
          className="mt-3 max-w-[22ch] font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.3] text-ink"
        >
          A web studio for the people who make houses
        </h1>
        <p data-reveal-item className={`mt-6 ${PROSE}`}>
          Most good businesses are undersold by their websites. The people who make houses are
          undersold more than most: work finished to the millimetre, shown on a page assembled in
          an afternoon. Closing that gap is the work.
        </p>
      </section>

      {/* TODO: photograph to come. The desk mid-project — printed page proofs
          next to a material sample, stone or timber or a paint card. Natural
          light, no screen glow, no face needed. 4:5, the full width of the
          text column. Drop the file in /public/studio/desk.jpg, give it alt
          text describing what is actually on the desk, and delete the
          placeholder branch below. */}
      <section aria-label="The studio at work" data-reveal className="pt-[2vh]">
        <div
          data-reveal-item
          className="relative aspect-[4/5] w-full max-w-[58ch] overflow-hidden border border-bone bg-background"
        >
          <p className="absolute inset-0 flex items-center justify-center px-6 text-center font-body text-[12px] uppercase tracking-[0.25em] text-ink/40">
            Photograph to come
          </p>
        </div>
      </section>

      <section aria-labelledby="who-it-is-for" data-reveal className="pt-[6vh]">
        <div data-reveal-item aria-hidden="true" className="h-px w-12 bg-bone" />
        <h2 id="who-it-is-for" data-reveal-item className={`mt-3 ${LABEL}`}>
          Who it is for
        </h2>
        <p data-reveal-item className={`mt-4 ${PROSE}`}>
          The studio works for the firms that make a house: the interior designer and the architect,
          the builder, the kitchen and joinery makers, the landscape designer, and the developer who
          brings them together. A single house can have six of these firms on it. Few of them have a
          website as good as the house.
        </p>
      </section>

      <section aria-labelledby="portfolio-first" data-reveal className="pt-[6vh]">
        <div data-reveal-item aria-hidden="true" className="h-px w-12 bg-bone" />
        <h2 id="portfolio-first" data-reveal-item className={`mt-3 ${LABEL}`}>
          Why the portfolio comes first
        </h2>
        <p data-reveal-item className={`mt-4 ${PROSE}`}>
          People choose an architect or a joiner from the photographs. So every site the studio
          builds leads with the projects and keeps the words short and factual. A new project can go
          up the week it is photographed.
        </p>
        <p data-reveal-item className={`mt-3 ${PROSE}`}>
          Every site is drawn from scratch and built by hand. No templates, no page builders.
        </p>
      </section>

      <section aria-labelledby="who" data-reveal className="pt-[6vh]">
        <div data-reveal-item aria-hidden="true" className="h-px w-12 bg-bone" />
        <h2 id="who" data-reveal-item className={`mt-3 ${LABEL}`}>
          Who
        </h2>
        <p data-reveal-item className={`mt-4 ${PROSE}`}>
          64 Studios was founded by Nkere Abang and works from Sheffield, in the United Kingdom.
        </p>
        <p data-reveal-item className={`mt-3 ${PROSE}`}>
          Design and build are the same job here. A page is drawn knowing how it will load on a
          phone on site, and the code carries the decisions the drawing made rather than an
          approximation of them.
        </p>
        <p data-reveal-item className={`mt-3 ${PROSE}`}>
          Sheffield is where the studio works from, not a limit on where it works. Projects run over
          video and email as readily as in person.
        </p>
      </section>

      <div data-reveal className="pb-[6vh] pt-[5vh]">
        <TransitionLink
          href="/contact"
          data-reveal-item
          className="group inline-flex items-center py-2 font-body text-xs uppercase tracking-[0.25em] text-ink"
        >
          <span className="relative pb-1">
            Begin a conversation
            <span className={UNDERLINE} />
          </span>
        </TransitionLink>
      </div>
    </main>
  );
}
