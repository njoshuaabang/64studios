"use client";

import { createContext, useContext, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { EASE_PANEL, gsap, playReveals, useGSAP } from "@/lib/motion";

type Phase = "pending" | "reveal" | "done";
const IntroContext = createContext<Phase>("done");

/** "reveal" once the page's content may enter; "done" when the intro has finished. Outside an Intro, always "done". */
export const useIntroPhase = () => useContext(IntroContext);

export const INTRO_KEY = "solstice-intro";

/**
 * The once-per-session intro (motion.md). An inline script in the root layout marks
 * html[data-intro="skip"] for return visits and reduced motion, so the panel never paints then.
 */
export function Intro({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("pending");
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current!;
      const panel = root.querySelector<HTMLElement>("[data-intro-panel]")!;
      const html = document.documentElement;
      const reveal = () => {
        setPhase("reveal");
        playReveals(root);
      };

      if (html.dataset.intro === "skip") {
        reveal();
        gsap.delayedCall(0.9, () => setPhase("done"));
        return;
      }

      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        // Storage blocked: the intro simply plays again next time.
      }
      const tl = gsap.timeline({
        onComplete: () => {
          html.dataset.intro = "skip";
          setPhase("done");
        },
      });
      tl.to(panel.querySelector("[data-logo-horizon]"), { strokeDashoffset: 0, duration: 0.6, ease: "none" })
        .to(panel.querySelectorAll("[data-logo-ray]"), {
          strokeDashoffset: 0,
          duration: 0.4,
          ease: EASE_PANEL,
          stagger: { each: 0.03, from: "center" },
        })
        .to(panel.querySelector("[data-logo-wordmark]"), { opacity: 1, duration: 0.3 }, "-=0.25")
        .add(() => {
          panel.style.pointerEvents = "none";
          reveal();
        }, "+=0.05")
        .to(panel, { yPercent: -100, duration: 0.7, ease: EASE_PANEL }, "<")
        .set(panel, { display: "none" });
    },
    { scope },
  );

  return (
    <IntroContext.Provider value={phase}>
      <div ref={scope} className="contents">
        {children}
        <div data-intro-panel aria-hidden className="fixed inset-0 z-[80] flex items-center justify-center bg-ink">
          {/* The mark is ~120px of the full logo's 316px. */}
          <Logo className="intro-logo w-[316px] max-w-[84vw]" />
        </div>
      </div>
    </IntroContext.Provider>
  );
}
