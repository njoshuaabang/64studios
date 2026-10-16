import type { PhotoSlot } from "@/lib/photos";
import { scrollCue } from "@/lib/content";
import { Hero } from "../hero/Hero";
import { HeroContent } from "../hero/HeroContent";
import { Intro } from "../intro/Intro";
import { Nav } from "../nav/Nav";
import { Footer } from "./Footer";
import { ScrollMotion } from "./ScrollMotion";
import { TrustSection } from "./TrustSection";

type Props = { photos: PhotoSlot[]; newbury: { rear: PhotoSlot; frame: PhotoSlot } };

/** Site B: the same hero, kept clean, then one trust section and a short footer. */
export function HomeB({ photos, newbury }: Props) {
  return (
    <Intro>
      <ScrollMotion>
        <main>
          <Hero photos={photos} className="flex h-svh flex-col">
            <Nav />
            <div className="shell grid flex-1 grid-cols-1 items-center gap-x-6 py-4 md:grid-cols-12">
              <div id="main" tabIndex={-1} data-hero-copy className="md:col-span-10 lg:col-span-8">
                <HeroContent />
              </div>
            </div>
            {/* Scroll cue: a 40px Limestone line with an Amber tick travelling down it. */}
            <div data-scroll-cue aria-hidden className="mb-6 flex flex-col items-center gap-2 self-center">
              <span className="text-label uppercase">{scrollCue}</span>
              <span className="relative block h-10 w-px overflow-hidden bg-limestone/40">
                <span className="scroll-tick absolute inset-x-0 top-0 h-2.5 bg-amber" />
              </span>
            </div>
          </Hero>
          <TrustSection newbury={newbury} />
        </main>
        <Footer />
      </ScrollMotion>
    </Intro>
  );
}
