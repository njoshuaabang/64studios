export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The site has one scroll effect and one entrance effect, and both read from
 * here. Anything that wants a different duration or easing is out of scope.
 */
export const REVEAL = {
  distance: 16,
  duration: 1.2,
  ease: "power2.out",
} as const;
