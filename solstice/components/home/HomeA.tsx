import type { PhotoSlot } from "@/lib/photos";
import { site } from "@/lib/content";
import { Hero } from "../hero/Hero";
import { HeroContent } from "../hero/HeroContent";
import { Intro } from "../intro/Intro";
import { Nav } from "../nav/Nav";
import { CaseStudyLine } from "../trust/CaseStudyLine";
import { CredentialsLine } from "../trust/CredentialsLine";
import { Figures } from "../trust/Figures";
import { LockScroll } from "./LockScroll";

/** Site A: one screen, no scroll, with the proof inside the hero. */
export function HomeA({ photos }: { photos: PhotoSlot[] }) {
  return (
    <Intro>
      <LockScroll />
      <Hero photos={photos} className="flex h-svh flex-col">
        <Nav />
        <main id="main" tabIndex={-1} className="relative flex min-h-0 flex-1 flex-col">
          <div className="shell grid flex-1 grid-cols-1 items-center gap-x-6 py-4 md:grid-cols-12">
            <HeroContent className="md:col-span-10 lg:col-span-8" />
          </div>

          <div className="relative">
            {/* Ink 0% → 60% over the bottom 40% of the hero, behind the band. */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[40svh] bg-(image:--bottom-gradient)" />
            <div className="shell relative pb-3 md:pb-4">
              <div className="flex flex-wrap items-end gap-x-6 gap-y-3 border-t border-(--rule-on-photo) pt-4 md:pt-6 lg:flex-nowrap">
                {/* About 60% from 1024px; full width on tablets so the four columns don't crush. */}
                <Figures layout="compact" className="w-full lg:w-[60%]" />
                <CaseStudyLine className="ml-auto hidden max-w-[24rem] text-right md:block" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-6 md:mt-4">
                <CredentialsLine className="hidden md:block" />
                <p className="ml-auto text-small whitespace-nowrap">{site.credit}</p>
              </div>
            </div>
          </div>
        </main>
      </Hero>
    </Intro>
  );
}
