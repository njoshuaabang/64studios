"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion, settle, RISE } from "@/lib/clara/motion";
import { useIsomorphicLayoutEffect } from "@/lib/clara/useIsomorphicLayoutEffect";

/**
 * The single motion signature, on a page's own heading: the same slow fade
 * and 14px rise the home hero opens with, played once on first paint.
 *
 * SplitText does the splitting so the heading rises by its own lines rather
 * than as one block — a two-line title then lifts as type rather than as a
 * box. It is the only thing SplitText is used for, and the lines are not
 * staggered against each other: the tokens allow one entrance, not a
 * cascade.
 *
 * Under reduced motion the effect never initialises and the heading is
 * simply there, which is also what a reader with no JavaScript gets.
 */
export default function Rise({
  as: Tag = "h1",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | undefined;
    let stopSettle: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(SplitText);
      split = new SplitText(el, { type: "lines", linesClass: "overflow-hidden" });

      const tween = gsap.fromTo(
        split.lines,
        { opacity: 0, y: RISE.distance },
        { opacity: 1, y: 0, duration: RISE.duration, ease: RISE.ease, delay: 0.15 }
      );

      // See `settle`: the heading must not stay invisible if rAF never runs.
      stopSettle = settle(tween, (0.15 + RISE.duration + 1) * 1000);
    }, el);

    return () => {
      stopSettle?.();
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <Tag ref={ref} data-rise className={className}>
      {children}
    </Tag>
  );
}
