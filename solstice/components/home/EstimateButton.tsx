"use client";

import { hero } from "@/lib/content";
import { trackEstimate } from "@/lib/analytics";
import { Button } from "../ui/Button";

// Client island so the server-rendered trust section can send the "trust" click event.
export function EstimateButton({ children, tone }: { children: React.ReactNode; tone: "dark" | "light" }) {
  return (
    <Button href={hero.primary.href} tone={tone} onClick={() => trackEstimate("trust")} className="w-full sm:w-auto">
      {children}
    </Button>
  );
}
