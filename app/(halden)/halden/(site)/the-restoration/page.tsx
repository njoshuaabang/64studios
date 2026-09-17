import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/halden/Reveal";
import { asset, haldenPath } from "@/lib/halden/paths";
import { haldenBase } from "@/lib/halden/server";

export const metadata: Metadata = {
  // Absolute: the metadata table sets the whole string, so the
  // "%s — Halden" template must not append to it.
  title: { absolute: "The Restoration | Halden, 18 Marylebone W1" },
  description:
    "A two-year restoration of a Grade II listed 1794 townhouse by Colebrook, with Lockhart Sneddon. What was kept, repaired and replaced.",
};

const paragraphs = [
  "Eighteen was built in 1794 as one of a terrace of six and remained a single house until 1954, when it was divided into eight flats. By the time Colebrook acquired it in 2023, four floors of original plan had been lost, the stair had been boxed in, and the garden was under concrete.",
  "The work took two years. The principle throughout was that anything original and sound would be kept, anything original and failing would be repaired, and anything lost would be replaced to the evidence rather than to taste. The 1794 survey drawings held by Westminster Archives were the reference for the plan, the cornice profiles and the floor pattern in the hall.",
  "The stone stair survived and has been cleaned. Eleven of the fourteen chimneypieces are original to the house; the remaining three were sourced from the period. Every sash window was removed, repaired and reinstated with slim-profile double glazing to conservation specification — the boxes, weights and shutters are the 1794 originals throughout.",
  "What is new is new without pretending otherwise. The kitchen, the bathrooms, the services and the plant are of this decade and make no attempt to be Georgian. The house has underfloor heating, whole-house ventilation, and an EPC of D, which for a Grade II townhouse of this age is at the upper end of what is achievable.",
  "Lockhart Sneddon acted as architect. Consent was granted by the City of Westminster in March 2023 and the works completed in April 2026.",
];

/** The two detail shots, moved here out of the house sequence. */
const details = [
  {
    src: "/images/door-handle.jpg",
    alt: "A brass lever handle and keyhole plate on an original panelled door, retained and refinished rather than replaced.",
  },
  {
    src: "/images/corridor.jpg",
    alt: "A second-floor corridor lined with original panelled doors, one standing open to the sash window at the end.",
  },
];

export default async function TheRestorationPage() {
  const base = await haldenBase();

  return (
    <main id="main-content" tabIndex={-1} className="w-full px-[var(--gutter)] pt-8 text-center md:pt-10">
      <Reveal>
        <h1 className="font-halden-display text-halden-display font-light">The restoration.</h1>
      </Reveal>

      <div className="mx-auto max-w-halden-prose pt-3 md:pt-4">
        {paragraphs.map((text) => (
          // The spacing sits on the wrapper, not the paragraph: each paragraph
          // is an only child, so `last:` would match every one of them.
          <Reveal key={text.slice(0, 40)} className="pb-3 last:pb-0">
            <p className="text-halden-note leading-[1.4] text-halden-ink/80">{text}</p>
          </Reveal>
        ))}
      </div>

      {/* The two detail shots as a pair, at their own 3:4 ratio so neither is
          cropped, then the stair full width beneath them. */}
      <div className="mx-auto grid max-w-halden-content gap-6 pt-8 md:grid-cols-2 md:pt-10">
        {details.map((image) => (
          <Reveal key={image.src}>
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={asset(image.src)}
                alt={image.alt}
                fill
                quality={82}
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="pt-8 md:pt-10">
        <div className="relative h-[80vh] w-full overflow-hidden">
          <Image
            src={asset("/images/stair-above.jpg")}
            alt="The original cantilevered stone staircase seen from the top floor, winding down past its mahogany handrail to the chequered marble of the hall."
            fill
            quality={82}
            sizes="(max-width: 1280px) 100vw, 1056px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal className="pt-10">
        <Link
          href={haldenPath(base, "/enquire")}
          className="inline-block text-halden-brass underline-offset-4 transition-colors duration-300 hover:underline"
        >
          Arrange a viewing →
        </Link>
      </Reveal>
    </main>
  );
}
