"use client";

import { hero } from "@/lib/content";
import { trackEstimate } from "@/lib/analytics";
import { Button } from "../ui/Button";

/** Headline, subline, the two buttons and the line under them. Identical on Site A and Site B. */
export function HeroContent({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <h1 data-rise className="font-display text-hero text-limestone">
        {hero.headline.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p data-reveal="1" className="mt-4 max-w-[34rem] text-body text-limestone md:mt-6">
        {hero.subline}
      </p>
      <div data-reveal="2" className="mt-6 flex flex-wrap gap-3 md:mt-8">
        <Button
          href={hero.primary.href}
          onClick={() => trackEstimate("hero")}
          className="grow md:grow-0"
        >
          {hero.primary.label}
        </Button>
        <Button href={hero.ghost.href} variant="ghost" className="grow md:grow-0">
          {hero.ghost.label}
        </Button>
      </div>
      <p data-reveal="3" className="mt-3 max-w-[34rem] text-small text-limestone md:mt-4">
        {hero.underline}
      </p>
    </div>
  );
}
