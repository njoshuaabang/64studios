"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import { framesRunning } from "@/lib/frames";
import TransitionLink from "./TransitionLink";
import NewsletterSignup from "./NewsletterSignup";
import { UNDERLINE } from "@/lib/underline";

const LABEL = "font-body text-[11px] uppercase tracking-[0.5em] text-ink";
const PROSE = "max-w-[58ch] font-body text-base leading-[1.6] text-ink";

export default function StudioSections() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    let cancelled = false;
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

    // Same reasoning as Halden's Reveal: where no frame runs, ScrollTrigger
    // never refreshes and every section on this page stays at autoAlpha 0,
    // which also sets visibility hidden. This is the studio's own page, so
    // that would hide the copy from anything rendering without a viewport.
    framesRunning().then((running) => {
      if (running || cancelled) return;
      gsap.set(container.querySelectorAll("[data-reveal-item]"), { clearProps: "all" });
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <main id="main-content" tabIndex={-1} ref={containerRef} className="mx-auto max-w-5xl px-4 md:px-6">
      {/*
        Hidden rather than displayed: the page opens on the mission statement,
        and a second heading above it would compete with the one line the page
        exists to deliver. It still carries the route's strongest keyword
        signal for anything reading the document rather than looking at it.
      */}
      <h1 className="sr-only">Brand identity and website design, made by hand in Sheffield</h1>

      <section aria-labelledby="mission-label" data-reveal className="pb-[2vh] pt-[4vh]">
        <div data-reveal-item>
          <div aria-hidden="true" className="h-px w-12 bg-ink" />
          <h2 id="mission-label" className={`mt-3 ${LABEL}`}>
            Mission
          </h2>
        </div>
        <p
          data-reveal-item
          className="mt-3 max-w-[42ch] font-display text-[clamp(1.375rem,2.1vw,1.75rem)] font-semibold leading-[1.35] text-ink"
        >
          From first conversation to final build, the studio exists to make brands look the way
          they deserve to. Most good businesses are undersold by their websites. Closing that gap
          is the work.
        </p>
      </section>

      {/* The two shorter sections share a row from md up: stacked they cost a
          screen each for a page that has to stay inside 1,400px. */}
      <div className="md:grid md:grid-cols-12 md:gap-6">
        <section aria-labelledby="studio-label" data-reveal className="pt-[1vh] md:col-span-6">
          <div data-reveal-item>
            <div aria-hidden="true" className="h-px w-12 bg-ink" />
            <h2 id="studio-label" className={`mt-3 ${LABEL}`}>
              The Studio
            </h2>
          </div>
          <p data-reveal-item className={`mt-4 ${PROSE}`}>
            64 Studios runs one project at a time. Nothing else is open while it is, and nothing
            waits in a queue behind it.
          </p>
          <p data-reveal-item className={`mt-3 ${PROSE}`}>
            That is why a project takes one to two weeks from first conversation to launch. The
            work is not compressed to fit the window. It has undivided attention for the whole of
            it, which is a different thing from being rushed.
          </p>
          <p data-reveal-item className={`mt-3 ${PROSE}`}>
            Every site is drawn from scratch and built by hand. No templates, no page builders. The
            web is crowded with sites that look alike because they were made alike, and the way out
            of that is to start from nothing each time.
          </p>
          <p data-reveal-item className={`mt-3 ${PROSE}`}>
            Running projects one at a time is also why the studio takes only a few in a year. That
            is the cost of the method, and it is the reason the method works.
          </p>
        </section>

        <section
          aria-labelledby="who-label"
          data-reveal
          className="pt-[1vh] md:col-span-5 md:col-start-8"
        >
          <div data-reveal-item>
            <div aria-hidden="true" className="h-px w-12 bg-ink" />
            <h2 id="who-label" className={`mt-3 ${LABEL}`}>
              Who
            </h2>
          </div>
          <p data-reveal-item className={`mt-4 ${PROSE}`}>
            64 Studios was founded by Nkere Abang and works from Sheffield, in the United Kingdom.
          </p>
          <p data-reveal-item className={`mt-3 ${PROSE}`}>
            Design and build are not treated as separate jobs here. A mark is drawn knowing how it
            will behave at sixteen pixels in a browser tab, and the type is chosen knowing which
            weights will actually load. Decisions made in the identity are the same decisions
            carried into the code, rather than specified in one place and interpreted in another.
          </p>
          <p data-reveal-item className={`mt-3 ${PROSE}`}>
            Sheffield is where the studio works from, not a limit on where it works. A project runs
            over video and email as readily as it does in person, and the one-to-two-week window is
            the same either way. Enquiries are answered within a day or two, whichever way they
            arrive.
          </p>
        </section>
      </div>

      <section
        aria-labelledby="how-label"
        data-reveal
        className="pt-[2vh] md:grid md:grid-cols-12 md:gap-6"
      >
        <div className="md:col-span-6">
          <div data-reveal-item>
            <div aria-hidden="true" className="h-px w-12 bg-ink" />
            <h2 id="how-label" className={`mt-3 ${LABEL}`}>
              How it runs
            </h2>
          </div>
          <p data-reveal-item className={`mt-4 ${PROSE}`}>
            A project runs one to two weeks, first conversation to launch.
          </p>
          <p data-reveal-item className={`mt-3 ${PROSE}`}>
            The first days go to the identity &mdash; the mark, and the type it sits in. That work
            is shown early and in full, rather than as directions to choose between, because a
            studio that offers three has usually only believed in one.
          </p>
          <p data-reveal-item className={`mt-3 ${PROSE}`}>
            The rest of the window goes to the site: drawn from the identity, built in Next.js,
            deployed on Vercel. Motion is written by hand where it earns its place and left out
            where it does not.
          </p>
          <p data-reveal-item className={`mt-3 ${PROSE}`}>
            What launches is what was shown. Nothing is approved as a picture and then rebuilt
            afterwards as an approximation of it.
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <p data-reveal-item className={`mt-3 md:mt-[2.75rem] ${PROSE}`}>
            Launch sits inside the window, and so does the handover &mdash; the domain pointed and
            the analytics connected, with the studio&rsquo;s notes on what was decided and why.
          </p>
          <p data-reveal-item className={`mt-3 ${PROSE}`}>
            What is needed to start is small. Whatever exists already, and a conversation long
            enough to hear what the thing actually is.
          </p>
          <p data-reveal-item className={`mt-3 ${PROSE}`}>
            Prices are not published. What a project costs depends on what it turns out to need,
            which is known after the first conversation rather than before it.
          </p>
        </div>
      </section>

      {/* The call to action and the email capture share a row: stacked, the
          capture would push this page past the height it is held to. */}
      <footer data-reveal className="pb-[3vh] pt-[2vh] md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
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
        <div data-reveal-item className="mt-6 md:col-span-7 md:col-start-6 md:mt-0">
          <NewsletterSignup />
        </div>
      </footer>
    </main>
  );
}
