"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { asset } from "@/lib/clara/paths";
import { prefersReducedMotion, settle, HERO, RISE } from "@/lib/clara/motion";
import { useIsomorphicLayoutEffect } from "@/lib/clara/useIsomorphicLayoutEffect";

/**
 * The home hero, and the only full run of the site's one motion signature:
 * the wordmark rises, the rule draws itself out from nothing, then the
 * subline, the positioning line and the scroll cue arrive on fixed delays.
 * The timings are those in `reference-home.html`, kept to the frame.
 *
 * Everything is opaque in the markup and hidden by GSAP on the first frame,
 * so a reader who never gets the script — or who has asked for less motion —
 * sees the finished lockup rather than an empty photograph. For the same
 * reason the timeline is never gated on tab visibility, and why `settle`
 * snaps it to its end state if the frame loop never ran: a browser that
 * reports itself hidden while it is in fact on screen would otherwise leave
 * the hero blank for good.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    let split: SplitText | undefined;
    let stopSettle: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(SplitText);

      const wordmark = root.querySelector<HTMLElement>("[data-hero-wordmark]");
      const rule = root.querySelector<HTMLElement>("[data-hero-rule]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-hero-step]", root);

      // SplitText only so the wordmark lifts as a line of type inside its own
      // clipped box, rather than as a rectangle. One line, so no stagger.
      let lines: Element[] = [];
      if (wordmark) {
        split = new SplitText(wordmark, { type: "lines", linesClass: "overflow-hidden" });
        lines = split.lines;
      }

      gsap.set(lines, { opacity: 0, y: RISE.distance });
      gsap.set(rule, { width: 0 });
      gsap.set(steps, { opacity: 0, y: RISE.distance });

      const tl = gsap.timeline({ defaults: { ease: RISE.ease } });

      tl.to(lines, { opacity: 1, y: 0, duration: HERO.wordmark.duration }, HERO.wordmark.at)
        .to(rule, { width: HERO.rule.width, duration: HERO.rule.duration }, HERO.rule.at)
        .to(steps[0], { opacity: 1, y: 0, duration: HERO.subline.duration }, HERO.subline.at)
        .to(steps[1], { opacity: 1, y: 0, duration: HERO.line.duration }, HERO.line.at)
        .to(steps[2], { opacity: 1, y: 0, duration: HERO.cue.duration }, HERO.cue.at);

      // A second past the end of the sequence, whether or not it ran.
      stopSettle = settle(tl, (HERO.cue.at + HERO.cue.duration + 1) * 1000);
    }, root);

    return () => {
      stopSettle?.();
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex h-[100dvh] w-full items-end justify-center overflow-hidden"
    >
      <Image
        src={asset("/images/home-hero.jpg")}
        alt="Honey-stone cottages along a quiet lane in the Cotswolds, in the shade of the trees above them."
        fill
        priority
        quality={82}
        sizes="100vw"
        className="object-cover brightness-[0.62] saturate-[0.92]"
      />

      <div className="relative z-[2] max-w-[640px] px-3 pb-[12vh] text-center text-clara-chalk">
        <h1
          data-hero-wordmark
          className="whitespace-nowrap font-clara-display text-[clamp(40px,6vw,64px)] font-normal leading-none tracking-[-0.01em] [font-optical-sizing:auto]"
        >
          Clara Ashdown
        </h1>

        <div
          data-hero-rule
          aria-hidden="true"
          className="mx-auto my-3 h-px w-8 bg-clara-chalk"
        />

        <div data-hero-step className="text-clara-sub tracking-[0.04em] text-clara-stone">
          interior design, gloucestershire
        </div>

        <p
          data-hero-step
          className="mt-4 font-clara-display text-[clamp(16px,1.9vw,19px)] font-normal italic leading-[1.6]"
        >
          i don’t renovate old houses so much as i negotiate with them.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 z-[2] -translate-x-1/2"
      >
        <div data-hero-step className="h-[42px] w-px bg-clara-chalk/50" />
      </div>
    </section>
  );
}
