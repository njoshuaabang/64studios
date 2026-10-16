"use client";

import { useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { track } from "@vercel/analytics";
import { variant } from "@/lib/variant";
import { EASE_REVEAL, gsap, reducedMotion, useGSAP } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Site B's scroll layer (motion.md, "Site B scroll motion"). Site A never loads it. */
export function ScrollMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const reduce = reducedMotion();
      const section = q("[data-trust-section]")[0] as HTMLElement;

      // trust_seen: once per page view, when half the section (or half the screen, for a tall section) is in view.
      let seen = false;
      const io = new IntersectionObserver(
        ([e]) => {
          if (seen || !e.isIntersecting) return;
          if (e.intersectionRatio >= 0.5 || e.intersectionRect.height >= innerHeight * 0.5) {
            seen = true;
            track("trust_seen", { variant });
            io.disconnect();
          }
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
      );
      io.observe(section);

      // The cue fades out on the first scroll.
      const cue = q("[data-scroll-cue]");
      const onFirstScroll = () => gsap.to(cue, { opacity: 0, duration: reduce ? 0.2 : 0.4 });
      addEventListener("scroll", onFirstScroll, { once: true, passive: true });

      // Trust content: each group rises 24px, children 80ms apart, at 80% of the viewport.
      q("[data-trust]").forEach((group) => {
        const items = group.children;
        ScrollTrigger.create({
          trigger: group,
          start: "top 80%",
          once: true,
          onEnter: () =>
            reduce
              ? gsap.to(items, { opacity: 1, duration: 0.2 })
              : gsap.to(items, { opacity: 1, y: 0, duration: 0.9, ease: EASE_REVEAL, stagger: 0.08 }),
        });
      });
      if (!reduce) gsap.set(q("[data-trust] > *"), { y: 24 });

      // The offset frames draw their lines when the pair comes into view (600ms).
      const lines = q("[data-frame] > span");
      ScrollTrigger.create({
        trigger: q("[data-pair]")[0],
        start: "top 80%",
        once: true,
        onEnter: () =>
          reduce
            ? gsap.to(lines, { opacity: 1, duration: 0.2 })
            : gsap.to(lines, { scale: 1, opacity: 1, duration: 0.6, ease: EASE_REVEAL, stagger: 0.05 }),
      });
      gsap.set(lines, reduce ? { opacity: 0 } : { scaleX: (i) => (i % 2 ? 1 : 0), scaleY: (i) => (i % 2 ? 0 : 1) });

      const cleanup = () => {
        io.disconnect();
        removeEventListener("scroll", onFirstScroll);
      };
      if (reduce) return cleanup;

      // Smooth scrolling, driven from GSAP's ticker and synced to ScrollTrigger.
      const lenis = new Lenis({ autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Hero photo at 0.85× scroll speed; the headline lifts 40px and fades as the trust section arrives.
      const hero = q("[data-hero-stage]")[0].closest("section")!;
      gsap.to(q("[data-hero-stage]"), {
        y: () => hero.offsetHeight * 0.15,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      });
      gsap.to(q("[data-hero-copy]"), {
        y: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "top 35%", scrub: true },
      });

      return () => {
        cleanup();
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
      };
    },
    { scope },
  );

  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  );
}
