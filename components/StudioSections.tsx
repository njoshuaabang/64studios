"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import TransitionLink from "./TransitionLink";

export default function StudioSections() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      container.querySelectorAll<HTMLElement>("[data-reveal]").forEach((block) => {
        const items = block.querySelectorAll<HTMLElement>("[data-reveal-item]");
        gsap.set(items, { autoAlpha: 0, y: 20 });
        gsap.to(items, {
          autoAlpha: 1,
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
      <h1 className="sr-only">Studio</h1>

      <section aria-labelledby="mission-label" data-reveal className="pb-[12vh] pt-[16vh]">
        <div data-reveal-item>
          <div aria-hidden="true" className="h-px w-12 bg-ink" />
          <h2
            id="mission-label"
            className="mt-3 font-body text-[11px] uppercase tracking-[0.5em] text-ink"
          >
            Mission
          </h2>
        </div>
        <p
          data-reveal-item
          className="mt-8 max-w-[24ch] font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.45] text-ink"
        >
          From first conversation to final build, the studio exists to make brands look the way
          they deserve to. Most good businesses are undersold by their websites. Closing that gap
          is the work.
        </p>
      </section>

      <section aria-labelledby="studio-label" data-reveal className="md:grid md:grid-cols-12">
        <div className="md:col-span-7 md:col-start-6">
          <div data-reveal-item>
            <div aria-hidden="true" className="h-px w-12 bg-ink" />
            <h2
              id="studio-label"
              className="mt-3 font-body text-[11px] uppercase tracking-[0.5em] text-ink"
            >
              The Studio
            </h2>
          </div>
          <p data-reveal-item className="mt-8 max-w-[55ch] font-body text-lg leading-[1.7] text-ink">
            64 Studios works slowly, on purpose. A few projects at a time, each taken from first
            sketch to launch without shortcuts. The studio was built on a simple observation: the
            web is crowded with sites that all look the same, because they were all made the same
            way.
          </p>
          <p
            data-reveal-item
            className="mt-[2em] max-w-[55ch] font-body text-lg leading-[1.7] text-ink"
          >
            Every site is drawn from scratch and built by hand. No templates, no page builders. The
            studio takes a few projects a year, which is what that standard allows.
          </p>
          <p
            data-reveal-item
            className="mt-[2em] max-w-[55ch] font-body text-lg leading-[1.7] text-ink"
          >
            It makes for a slower business than most. It also means every project gets the attention
            it was promised &mdash; and that there is always room to talk properly about the work
            before it starts.
          </p>
        </div>
      </section>

      <footer data-reveal className="pb-[12vh] pt-[14vh] md:grid md:grid-cols-12">
        <div className="md:col-span-7 md:col-start-6">
          <TransitionLink
            href="/contact"
            data-reveal-item
            className="group inline-flex items-center py-2 font-body text-xs uppercase tracking-[0.25em] text-ink"
          >
            <span className="relative pb-1">
              Begin a conversation
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-400 ease-out group-hover:scale-x-100" />
            </span>
          </TransitionLink>
        </div>
      </footer>
    </main>
  );
}
