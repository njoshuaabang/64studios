"use client";

import { useRef } from "react";
import { playReveals, useGSAP } from "@/lib/motion";

/** Entrance for pages without the intro: the H1 rises as the transition panel lifts. */
export function PageReveal({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => playReveals(scope.current!, 0.15), { scope });
  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  );
}
