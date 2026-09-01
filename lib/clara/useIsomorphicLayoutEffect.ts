import { useEffect, useLayoutEffect } from "react";

/**
 * GSAP sets an element's starting state before first paint, which is what
 * keeps an entrance from flashing in and back out. `useLayoutEffect` warns
 * during SSR, so fall back to `useEffect` on the server, where neither one
 * runs anyway.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
