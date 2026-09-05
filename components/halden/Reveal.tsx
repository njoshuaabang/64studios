"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, REVEAL } from "@/lib/halden/motion";
import { framesRunning } from "@/lib/frames";
import { useIsomorphicLayoutEffect } from "@/lib/halden/useIsomorphicLayoutEffect";

/**
 * The site's only scroll effect: fade up 16px, once, on entering view. Nothing
 * else moves on scroll — no parallax, no pinning, no re-triggering. Anything
 * that wants to animate on this site does it by wrapping itself in this.
 *
 * Content renders opaque and in place; the hidden starting state is set in JS,
 * so reduced motion and a failed script both leave the page readable.
 */
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    let cancelled = false;
    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: REVEAL.distance });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: REVEAL.duration,
        ease: REVEAL.ease,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    // ScrollTrigger refreshes on a frame. Where no frame ever runs it never
    // refreshes, so nothing reveals and the from-state above is the whole
    // page. A stall watcher cannot help here: an element below the fold that
    // has not revealed yet is indistinguishable from one that never will. The
    // question worth asking is whether the frame loop is running at all.
    framesRunning().then((running) => {
      if (running || cancelled) return;
      gsap.set(el, { clearProps: "all" });
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}
