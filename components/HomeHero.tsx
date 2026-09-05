"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Wordmark from "./Wordmark";
import PortfolioButton from "./PortfolioButton";
import { prefersReducedMotion } from "@/lib/motion";
import { watchForStall } from "@/lib/frames";

export default function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("homepage-lock");
    document.body.classList.add("homepage-lock");
    return () => {
      document.documentElement.classList.remove("homepage-lock");
      document.body.classList.remove("homepage-lock");
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardEl = container.querySelector<HTMLElement>("[data-card]");
    const numberEl = container.querySelector<HTMLElement>("[data-wordmark-64]");
    const ruleEl = container.querySelector<HTMLElement>("[data-wordmark-rule]");
    const studiosEl = container.querySelector<HTMLElement>("[data-wordmark-studios]");
    const taglineEl = container.querySelector<HTMLElement>("[data-tagline]");
    const buttonEl = container.querySelector<HTMLElement>("[data-portfolio-button]");
    const noteEl = container.querySelector<HTMLElement>("[data-home-note]");
    // The nav is rendered by the layout, not by this component, so it is
    // reached through the document. Only the homepage animates it; every other
    // route leaves it alone and it is simply there.
    const navEl = document.querySelector<HTMLElement>("[data-corner-nav]");
    const targets = [navEl, cardEl, numberEl, ruleEl, studiosEl, taglineEl, buttonEl, noteEl].filter(
      Boolean,
    );

    if (prefersReducedMotion()) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    gsap.registerPlugin(SplitText);

    let split: SplitText | undefined;
    let cancelWatch = () => {};
    const ctx = gsap.context(() => {
      gsap.set(navEl, { opacity: 0 });
      gsap.set(cardEl, { opacity: 0 });
      gsap.set(numberEl, { opacity: 0, y: 24 });
      gsap.set(ruleEl, { scaleX: 0 });
      gsap.set(taglineEl, { opacity: 0 });
      gsap.set(buttonEl, { opacity: 0 });
      gsap.set(noteEl, { opacity: 0 });

      let chars: Element[] = [];
      if (studiosEl) {
        // aria: "none" — SplitText's default adds aria-label to the element it
        // splits, and this one is a <span>, where aria-label is prohibited
        // without a role. The split leaves the text contiguous in the DOM, so
        // the h1 still reads "64. Studios" from its own content; the tracking
        // that separates the letters visually is CSS, never literal spaces.
        split = new SplitText(studiosEl, { type: "chars", aria: "none" });
        chars = split.chars;
        gsap.set(chars, { opacity: 0, y: 8 });
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(navEl, { opacity: 1, duration: 0.8, ease: "power2.out" })
        .to(cardEl, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
        .to(numberEl, { opacity: 1, y: 0, duration: 1.1 }, "-=0.3")
        .to(ruleEl, { scaleX: 1, duration: 0.9, ease: "power2.out" }, "-=0.6")
        .to(chars, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: "power2.out" }, "-=0.5")
        .to(taglineEl, { opacity: 1, duration: 0.8 }, "-=0.3")
        .to(buttonEl, { opacity: 1, duration: 0.8 }, "-=0.4")
        .to(noteEl, { opacity: 1, duration: 0.8 }, "-=0.3");

      // Nothing on this page is readable until the timeline runs, so it cannot
      // be allowed to strand. If two samples pass with no progress, the frame
      // loop has stopped and the reveal is finished by hand instead: the split
      // is reverted and the inline from-state is cleared, which returns every
      // element to its CSS resting state. That state is opaque, because none
      // of this content is hidden in CSS.
      cancelWatch = watchForStall(
        () => tl.progress(),
        () => {
          tl.kill();
          split?.revert();
          split = undefined;
          gsap.set(targets, { clearProps: "all" });
        },
      );
    }, container);

    return () => {
      cancelWatch();
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <main
      id="main-content" tabIndex={-1}
      ref={containerRef}
      // The bottom padding reserves the room the address in the footer needs.
      // It applies exactly while the intro paragraph is in normal flow, since
      // that is when the two would otherwise occupy the same band; once the
      // paragraph moves to its bottom-left corner the address is diagonally
      // opposite it and nothing has to give.
      className="fixed inset-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background px-2 pt-9 pb-14 md:pt-10 [@media(min-width:768px)_and_(min-height:600px)]:pb-0"
    >
      <div data-card className="flex w-full flex-col items-center justify-center px-2 py-4">
        <Wordmark as="h1" size="hero" />
        {/*
          The positioning line, in the slot the category label used to hold.
          Body face and sentence case, because it is a sentence: no uppercase
          and no letter-spacing, both of which would make it read as a label
          again. It is allowed to break to a second line on a narrow screen
          and never to a third, which is what the measure below is set for.
        */}
        <p
          data-tagline
          className="mt-3 max-w-[30ch] text-balance px-2 text-center font-body text-base leading-[1.65] text-ink md:mt-8 md:max-w-none [@media(max-height:500px)]:mt-2"
        >
          Most good businesses are undersold by their websites.
        </p>
        <div className="mt-6 md:mt-10 [@media(max-height:500px)]:mt-3">
          <PortfolioButton />
        </div>
      </div>

      {/*
        Below the button until the viewport is both wide and tall enough for
        the corner position — bottom-left, from md up. Gating the corner
        position on height too (not just width) matters because the page
        cannot scroll: a wide-but-short window (a laptop lid barely open, a
        landscape phone) used to pull the note out of flow into the same
        corner the card already occupies, overlapping the two. Below that
        combined threshold it stays in normal flow, same as a phone, and the
        size steps down at the narrow end so the whole sentence still fits.
      */}
      <p
        data-home-note
        className="mt-4 w-full max-w-[34ch] self-start px-2 text-left font-body text-base leading-[1.65] text-ink [@media(min-width:768px)_and_(min-height:600px)]:absolute [@media(min-width:768px)_and_(min-height:600px)]:bottom-6 [@media(min-width:768px)_and_(min-height:600px)]:left-6 [@media(min-width:768px)_and_(min-height:600px)]:mt-0 [@media(min-width:768px)_and_(min-height:600px)]:max-w-[34ch] [@media(min-width:768px)_and_(min-height:600px)]:px-0 [@media(max-height:500px)]:mt-3"
      >
        64 Studios is a branding agency working across identity and the web. The studio designs
        brand marks and builds high-end websites for companies whose presence has fallen behind the
        quality of their work &mdash; hotels, makers, practices and founders who would rather not
        blend in.
      </p>
    </main>
  );
}
