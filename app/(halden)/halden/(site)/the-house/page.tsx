import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/halden/Reveal";
import { houseSequence, type HouseBlock } from "@/lib/halden/house";
import { asset } from "@/lib/halden/paths";

export const metadata: Metadata = {
  title: "The House",
  description:
    "Nine rooms of a Georgian townhouse in Marylebone: the hall, the bar, one dining table, the library, six bedrooms and a garden at the back.",
};

/*
 * Each plate is a centred column: image, then room label, then the note. The
 * measurements come from the `.house` custom properties in globals.css, which
 * hold the whole breakpoint table.
 */

const PLATE_SIZES =
  "(min-width: 1440px) 1120px, (min-width: 1200px) 1000px, (min-width: 900px) 840px, 100vw";

const DETAIL_SIZES = "(min-width: 900px) 33vw, 100vw";

function Plate({
  block,
  priority,
}: {
  block: Extract<HouseBlock, { kind: "plate" }>;
  priority: boolean;
}) {
  return (
    <section className="house-plate">
      <Reveal className="house-figure">
        <Image
          src={asset(block.src)}
          alt={block.alt}
          fill
          priority={priority}
          quality={82}
          sizes={PLATE_SIZES}
          style={{ objectPosition: block.objectPosition }}
          className="object-cover"
        />
      </Reveal>

      <Reveal className="house-rail">
        <h2 className="pb-3 font-halden-display text-halden-micro uppercase tracking-[0.2em] text-halden-brass">
          {block.eyebrow}
        </h2>
        <p
          className={`house-copy${
            block.narrowCopy ? " house-copy-narrow" : ""
          } text-halden-note text-halden-ink/80`}
        >
          {block.copy}
        </p>
      </Reveal>
    </section>
  );
}

export default function TheHousePage() {
  const plates = houseSequence.filter(
    (b): b is Extract<HouseBlock, { kind: "plate" }> => b.kind === "plate"
  );
  const details = houseSequence.filter(
    (b): b is Extract<HouseBlock, { kind: "inset" }> => b.kind === "inset"
  );

  return (
    <main className="house flex flex-col gap-[var(--space-section)] pt-[var(--space-section)]">
      {/* Was visually hidden; now the page's own centred title. */}
      <Reveal className="house-title">
        <h1 className="font-halden-display text-halden-display font-light">The House.</h1>
      </Reveal>

      {plates.map((block, i) => (
        <Plate key={block.src} block={block} priority={i === 0} />
      ))}

      {/*
        The detail shots, gathered out of the sequence into one closing row.
        All three sources are 3:4, so the row lines up on their own ratio and
        nothing is cropped. `align` on the data is unused while they sit here.
      */}
      <section className="house-details">
        {details.map((block) => (
          <Reveal key={block.src} className="house-details-figure">
            <Image
              src={asset(block.src)}
              alt={block.alt}
              fill
              quality={82}
              sizes={DETAIL_SIZES}
              className="object-cover"
            />
          </Reveal>
        ))}
      </section>
    </main>
  );
}
