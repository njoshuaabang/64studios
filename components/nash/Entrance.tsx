"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * The one-time entrance. Two walnut panels meet at the centre under the
 * wordmark, hold, then part left and right to reveal the hero.
 *
 * Timing, easing and durations are lifted from loading-animation-reference.html
 * unchanged: 1.1s hold, 1s panel slide on cubic-bezier(0.76, 0, 0.24, 1), and a
 * 1.2s wordmark settle beginning at 1.15s. The animation itself is CSS so the
 * reference's exact bezier survives — GSAP's free eases only approximate it.
 *
 * Where it departs from the reference is the settle target. The reference drops
 * the wordmark to 88% of the viewport because that is where its hero wordmark
 * lives; here the wordmark's resting place is the nav, so the target is
 * measured from the real nav at run time and handed to CSS as custom
 * properties. That keeps it correct at every breakpoint rather than pinned to
 * one magic percentage.
 *
 * Whether this plays at all is decided before paint by the inline script in the
 * root layout, which checks prefers-reduced-motion and sets data-ncd-entrance
 * on <html>. Rendering the panels unconditionally and hiding them later would
 * flash walnut at anyone the sequence is meant to skip.
 */
export default function Entrance() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (document.documentElement.getAttribute("data-ncd-entrance") !== "play") return;

    const target = document.querySelector<HTMLElement>("[data-nash-wordmark]");
    if (target) {
      const rect = target.getBoundingClientRect();
      const size = getComputedStyle(target).fontSize;
      root.style.setProperty("--ncd-settle-x", `${Math.round(rect.left)}px`);
      root.style.setProperty("--ncd-settle-y", `${Math.round(rect.top)}px`);
      root.style.setProperty("--ncd-settle-size", size);
    }

    // Clear the flag once the sequence has finished so nothing stays pinned to
    // an animating state — the panels are long gone by then.
    const done = window.setTimeout(() => {
      document.documentElement.removeAttribute("data-ncd-entrance");
    }, 3600);

    return () => window.clearTimeout(done);
  }, []);

  return (
    <div ref={ref} className="ncd-entrance" aria-hidden="true">
      <div className="ncd-panel ncd-panel-left" />
      <div className="ncd-panel ncd-panel-right" />
      <div className="ncd-wordmark">Nash Calloway Design</div>
    </div>
  );
}
