import type { Metadata } from "next";
import Hero from "@/components/nash/Hero";
import Nav from "@/components/nash/Nav";
import SignOff from "@/components/nash/SignOff";

export const metadata: Metadata = {
  title: { absolute: "Nash Calloway Design" },
};

/**
 * One finished project per collection, in the order the portfolio lists them.
 * These are the same photographs the project pages carry — the hero is the
 * work, not a mood board shot for the purpose.
 */
const frames = [
  {
    src: "/nash/images/carbon-after.jpg",
    alt: "A low modern house behind palms, its glazed beach elevation open to the light.",
  },
  {
    src: "/nash/images/chester-after.jpg",
    alt: "A white stucco terrace of London townhouses behind bare trees.",
  },
  { src: "/nash/images/punta-after.jpg", alt: "A pool held between dense planting at the villa." },
  { src: "/nash/images/canon-after.jpg", alt: "A single work hung on a white wall, lit from above." },
];

export default function NashHomePage() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col">
      <Hero frames={frames} />

      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <Nav transparent />

        <div className="flex flex-1 flex-col justify-end px-4 pb-10 md:px-8 md:pb-14">
          <h1 className="font-nash-display text-4xl font-medium text-nash-plaster md:text-6xl">
            Nash Calloway Design
          </h1>
          <p className="mt-2 max-w-[40ch] font-nash-body text-base text-nash-plaster md:text-lg">
            Mid-century instinct. Wherever the house is.
          </p>

          <div className="mt-8 md:mt-10">
            <SignOff onDark />
          </div>
        </div>
      </div>
    </main>
  );
}
