/**
 * Every reveal on this site advances on requestAnimationFrame, because that is
 * what GSAP's ticker and ScrollTrigger both run on. A browser suspends
 * requestAnimationFrame outright when a document is not being presented — a
 * headless renderer, a social-preview scraper, a screenshot or thumbnail
 * service, a background tab. Those contexts still run the effect that sets a
 * from-state of opacity 0, and then never run the frames that undo it.
 *
 * setTimeout is throttled in the same contexts but never suspended, which is
 * the whole reason these two helpers use it. It is the only clock here that
 * can be trusted to fire.
 */

/**
 * Whether the browser is actually running animation frames.
 *
 * For a reveal that has not started at all, which is the failure mode of
 * anything gated on ScrollTrigger: if no frame ever runs, the trigger never
 * refreshes and the content stays at its from-state for good.
 */
export function framesRunning(withinMs = 1000): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    let frames = 0;
    const tick = () => {
      frames += 1;
      if (frames < 2) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    window.setTimeout(() => resolve(frames >= 2), withinMs);
  });
}

/**
 * Watches a reveal that is already running and calls `onStall` if it stops
 * advancing before it finishes.
 *
 * This is the case a simple "did it start?" check misses. A stranded timeline
 * has usually ticked a little first — the observed failure on the home page
 * left the nav at opacity 0.0731, seven per cent into its first tween — so the
 * signal to watch for is progress that stops changing, not progress that never
 * begins. Two consecutive samples with no movement means no frames ran between
 * them.
 *
 * Returns a cancel function. Call it on unmount so nothing fires afterwards.
 */
export function watchForStall(
  progress: () => number,
  onStall: () => void,
  stepMs = 600,
): () => void {
  if (typeof window === "undefined") return () => {};

  let previous = -1;
  const id = window.setInterval(() => {
    const current = progress();
    if (current >= 1) {
      window.clearInterval(id);
      return;
    }
    if (current === previous) {
      window.clearInterval(id);
      onStall();
      return;
    }
    previous = current;
  }, stepMs);

  return () => window.clearInterval(id);
}
