import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/halden/Reveal";
import Particulars from "@/components/halden/Particulars";
import { houseSections, houseIntro, type HouseSection } from "@/lib/halden/house";
import { asset } from "@/lib/halden/paths";

export const metadata: Metadata = {
  // Absolute: the metadata table sets the whole string, so the
  // "%s — Halden" template must not append to it.
  title: { absolute: "The House | Halden, Marylebone Townhouse for Sale" },
  description:
    "Room by room through 5,240 sq ft across five floors — hall, bar, dining room, library, six bedrooms and a south-facing walled garden.",
};

/*
 * Each section is a centred column: image, then room label, then the note.
 * The measurements come from the `.house` custom properties in globals.css,
 * which hold the whole breakpoint table.
 */

const PLATE_SIZES =
  "(min-width: 1440px) 1120px, (min-width: 1200px) 1000px, (min-width: 900px) 840px, 100vw";

function Plate({ block, priority }: { block: HouseSection; priority: boolean }) {
  return (
    <section className={`house-plate${block.bleed ? " house-plate-bleed" : ""}`}>
      <Reveal className="house-figure">
        <Image
          src={asset(block.src)}
          alt={block.alt}
          fill
          preload={priority}
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
  return (
    <main id="main-content" tabIndex={-1} className="house flex flex-col gap-[var(--space-section)] pt-[var(--space-section)]">
      <Reveal className="house-title">
        <h1 className="font-halden-display text-halden-display font-light">The House.</h1>
      </Reveal>

      {/* The intro sits in the rail rather than under the title: it is the
          particulars in prose, and belongs to the sequence below it rather
          than to the heading above. */}
      <Reveal className="house-rail house-intro">
        <p className="house-copy text-halden-note text-halden-ink/80">{houseIntro}</p>
      </Reveal>

      {houseSections.map((block, i) => (
        <Plate key={block.src} block={block} priority={i === 0} />
      ))}

      <Particulars />
    </main>
  );
}
