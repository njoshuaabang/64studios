import type gsap from "gsap";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The site has one motion signature and everything reads from here: opacity
 * 0 → 1 with a 14px rise, about a second, eased. The delays are the fixed
 * steps of the home hero — wordmark, then the rule drawing itself, then the
 * subline, then the positioning line, then the scroll cue — and they are the
 * timings in `reference-home.html`, kept to the frame.
 *
 * Nothing else on the site animates. No scroll reveals, no card staggers.
 */
export const RISE = {
  distance: 14,
  duration: 1,
  ease: "power2.out",
} as const;

export const HERO = {
  wordmark: { duration: 1.1, at: 0.2 },
  rule: { duration: 1, at: 1.1, width: 64 },
  subline: { duration: 1, at: 1.4 },
  line: { duration: 1, at: 1.65 },
  cue: { duration: 1, at: 2 },
} as const;

/**
 * GSAP advances on `requestAnimationFrame`, which a browser stops firing
 * whenever it considers the document hidden — and some environments report
 * hidden while the page is plainly on screen (embedded panes, screenshot
 * runners, prerenderers). An entrance that fades type *in* would then leave
 * the hero permanently blank, which is a far worse failure than a skipped
 * animation.
 *
 * `setTimeout` keeps running in those conditions, so it is used here as a
 * dead man's switch: if the animation has not finished by the time it should
 * comfortably have done, it is snapped to its final state. When rAF is
 * healthy this timer fires after the animation has already completed and
 * does nothing at all.
 */
export function settle(animation: gsap.core.Animation, afterMs: number): () => void {
  const timer = window.setTimeout(() => {
    if (animation.progress() < 1) animation.progress(1);
  }, afterMs);

  return () => window.clearTimeout(timer);
}
