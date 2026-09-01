"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Wordmark from "./Wordmark";
import TaglineLockup from "./TaglineLockup";
import PortfolioButton from "./PortfolioButton";
import { prefersReducedMotion } from "@/lib/motion";

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
    const targets = [cardEl, numberEl, ruleEl, studiosEl, taglineEl, buttonEl].filter(Boolean);

    if (prefersReducedMotion()) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    gsap.registerPlugin(SplitText);

    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      gsap.set(cardEl, { opacity: 0 });
      gsap.set(numberEl, { opacity: 0, y: 24 });
      gsap.set(ruleEl, { scaleX: 0 });
      gsap.set(taglineEl, { opacity: 0 });
      gsap.set(buttonEl, { opacity: 0 });

      let chars: Element[] = [];
      if (studiosEl) {
        split = new SplitText(studiosEl, { type: "chars" });
        chars = split.chars;
        gsap.set(chars, { opacity: 0, y: 8 });
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(cardEl, { opacity: 1, duration: 0.8, ease: "power2.out" })
        .to(numberEl, { opacity: 1, y: 0, duration: 1.1 }, "-=0.3")
        .to(ruleEl, { scaleX: 1, duration: 0.9, ease: "power2.out" }, "-=0.6")
        .to(chars, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: "power2.out" }, "-=0.5")
        .to(taglineEl, { opacity: 1, duration: 0.8 }, "-=0.3")
        .to(buttonEl, { opacity: 1, duration: 0.8 }, "-=0.4");
    }, container);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="fixed inset-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-bone px-2"
    >
      <div
        data-card
        className="flex aspect-square w-full max-w-[min(88vw,80dvh,36rem)] flex-col items-center justify-center bg-background px-2 py-4"
      >
        <Wordmark as="h1" size="hero" />
        <TaglineLockup className="mt-3 md:mt-8 [@media(max-height:500px)]:mt-2" />
        <div className="mt-6 md:mt-10 [@media(max-height:500px)]:mt-3">
          <PortfolioButton />
        </div>
      </div>
    </main>
  );
}
