"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, CustomEase, SplitText);

// The only two curves (motion.md).
export const EASE_REVEAL = CustomEase.create("reveal", "0.16,1,0.3,1");
export const EASE_PANEL = CustomEase.create("panel", "0.76,0,0.24,1");

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Headline lines rise out of overflow-hidden masks, 90ms apart; a 200ms fade with reduced motion. */
export function riseLines(el: HTMLElement, delay = 0) {
  if (reducedMotion()) {
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2, delay });
    return;
  }
  // Split only once fonts are in, so the line breaks don't shift.
  document.fonts.ready.then(() => {
    if (!el.isConnected) return;
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) => {
        gsap.set(el, { opacity: 1 });
        return gsap.from(self.lines, { yPercent: 110, duration: 1, ease: EASE_REVEAL, stagger: 0.09, delay });
      },
    });
  });
}

/** Elements fade up 12px, 60ms apart; a 200ms fade with reduced motion. */
export function fadeUp(targets: Element[], delay = 0) {
  if (!targets.length) return;
  if (reducedMotion()) {
    gsap.to(targets, { opacity: 1, duration: 0.2, delay });
    return;
  }
  gsap.fromTo(targets, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: EASE_REVEAL, stagger: 0.06, delay });
}

export { gsap, useGSAP };

/** Plays a page's entrance: [data-rise] headings, then [data-reveal="n"] items in n order. */
export function playReveals(root: ParentNode, delay = 0) {
  root.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => riseLines(el, delay));
  const items = [...root.querySelectorAll<HTMLElement>("[data-reveal]")].sort(
    (a, b) => Number(a.dataset.reveal) - Number(b.dataset.reveal),
  );
  fadeUp(items, delay + 0.35);
}
