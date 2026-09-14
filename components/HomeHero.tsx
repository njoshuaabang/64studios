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
    // The nav is rendered by the layout, not by this component, so it is
    // reached through the document. Only the homepage animates it; every other
    // route leaves it alone and it is simply there.
    const navEl = document.querySelector<HTMLElement>("[data-corner-nav]");
    const targets = [navEl, cardEl, numberEl, ruleEl, studiosEl, taglineEl, buttonEl].filter(
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
      // Every from-state here is visible. The entrance used to start at
      // opacity 0, which meant the threshold — the wordmark included — was a
      // blank page until the timeline ran. It now starts legible at 0.3 of
      // full ink and rises to 1, so the page reads from the first paint and
      // the motion is a settling rather than an appearance.
      gsap.set(navEl, { opacity: 0.3 });
      gsap.set(cardEl, { opacity: 1 });
      gsap.set(numberEl, { opacity: 0.3, y: 24 });
      gsap.set(ruleEl, { scaleX: 0.12 });
      gsap.set(taglineEl, { opacity: 0.3 });
      gsap.set(buttonEl, { opacity: 0.3 });

      let chars: Element[] = [];
      if (studiosEl) {
        // aria: "none" — SplitText's default adds aria-label to the element it
        // splits, and this one is a <span>, where aria-label is prohibited
        // without a role. The split leaves the text contiguous in the DOM, so
        // the h1 still reads "64. Studios" from its own content; the tracking
        // that separates the letters visually is CSS, never literal spaces.
        split = new SplitText(studiosEl, { type: "chars", aria: "none" });
        chars = split.chars;
        gsap.set(chars, { opacity: 0.3, y: 8 });
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(navEl, { opacity: 1, duration: 0.8, ease: "power2.out" })
        .to(numberEl, { opacity: 1, y: 0, duration: 1.1 }, "-=0.5")
        .to(ruleEl, { scaleX: 1, duration: 0.9, ease: "power2.out" }, "-=0.6")
        .to(chars, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: "power2.out" }, "-=0.5")
        .to(taglineEl, { opacity: 1, duration: 0.8 }, "-=0.3")
        .to(buttonEl, { opacity: 1, duration: 0.8 }, "-=0.4");

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
      // The bottom padding keeps the composition clear of the address sitting
      // at the foot of the threshold. The long intro paragraph that used to
      // compete for that band is gone, so one value serves every width.
      className="fixed inset-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background px-2 pt-9 pb-14 md:pt-10"
    >
      <div data-card className="flex w-full flex-col items-center justify-center px-2 py-4 [@media(max-height:700px)]:py-1">
        <Wordmark size="hero" />
        {/*
          The positioning line, and the page's one H1. Body face and sentence
          case, because it is a sentence: uppercase or letter-spacing would
          make it read as a category label, which is what this slot used to
          hold. It may break to a second line on a narrow screen and never to
          a third, which is what the measure is set for.

          The wordmark above is a div here rather than the H1 it used to be:
          a page has one H1, and on this page it is the sentence that says
          what the studio does, not the mark.
        */}
        <h1
          data-tagline
          className="mt-3 max-w-[30ch] text-balance px-2 text-center font-body text-[20px] font-normal leading-[1.45] text-ink md:mt-8 md:max-w-none md:text-[24px] [@media(max-height:700px)]:mt-2"
        >
          Websites for the people behind fine homes.
        </h1>
        <div className="mt-6 md:mt-10 [@media(max-height:700px)]:mt-3">
          <PortfolioButton />
        </div>
      </div>

    </main>
  );
}
