"use client";

import { useRef } from "react";
import { figures } from "@/lib/content";
import { gsap, reducedMotion, useGSAP } from "@/lib/motion";
import { useIntroPhase } from "../intro/Intro";

type Props = {
  /** compact: Site A's bottom band. full: Site B's trust section. */
  layout?: "compact" | "full";
  className?: string;
};

/** The four trust figures. Numeric values count up once, over 1.2s, when the intro finishes. */
export function Figures({ layout = "compact", className = "" }: Props) {
  const scope = useRef<HTMLDListElement>(null);
  const play = useIntroPhase() === "done";

  useGSAP(
    () => {
      if (reducedMotion()) return;
      scope.current!.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        if (!play) {
          el.textContent = "0";
          return;
        }
        const n = { v: 0 };
        gsap.to(n, {
          v: to,
          duration: 1.2,
          ease: "reveal",
          onUpdate: () => void (el.textContent = String(Math.round(n.v))),
          onComplete: () => void (el.textContent = `${to}${el.dataset.suffix ?? ""}`),
        });
      });
    },
    { scope, dependencies: [play] },
  );

  const grid =
    layout === "compact"
      ? "grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4"
      : "grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4";

  return (
    <dl ref={scope} className={`${grid} ${className}`}>
      {figures.map((f) => (
        <div key={f.value} className="flex flex-col-reverse justify-end gap-1">
          <dt className="text-small">{f.label}</dt>
          <dd className="font-display text-figure whitespace-nowrap">
            {/* Screen readers get the final value; the count-up is visual only. */}
            <span className="sr-only">{f.value}</span>
            <span aria-hidden data-count={f.countTo} data-suffix={f.suffix} suppressHydrationWarning>
              {f.value}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
