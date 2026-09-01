import Image from "next/image";
import Reveal from "@/components/Reveal";
import { houseIntro, houseSequence, type HouseBlock } from "@/lib/house";
import { asset } from "@/lib/basePath";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/the-house",
  title: "The House | Halden Private Members’ Club, Marylebone",
  description:
    "Inside Halden: a Marylebone bar, private dining room for twelve, library, walled garden and six member bedrooms in a restored 1794 townhouse.",
});

/*
 * Both slots escape the site container: the measurements come from the `.house`
 * custom properties in globals.css, which hold the whole breakpoint table.
 */

const PLATE_SIZES =
  "(min-width: 1440px) calc(100vw - 480px), (min-width: 1200px) calc(100vw - 408px), (min-width: 900px) calc(100vw - 336px), 100vw";

const DETAIL_SIZES = "(min-width: 900px) 48vw, 80vw";

function Plate({
  block,
  priority,
}: {
  block: Extract<HouseBlock, { kind: "plate" }>;
  priority: boolean;
}) {
  return (
    <section className="house-plate">
      <Reveal className="house-rail">
        <h2 className="pb-3 font-display text-micro uppercase tracking-[0.2em] text-brass">
          {block.eyebrow}
        </h2>
        <p className="house-copy text-note text-ink/80">{block.copy}</p>
      </Reveal>

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
    </section>
  );
}

function Detail({ block }: { block: Extract<HouseBlock, { kind: "inset" }> }) {
  return (
    <section>
      <Reveal
        className={`house-detail ${
          block.align === "right" ? "house-detail-right" : ""
        }`}
      >
        <div className="house-detail-figure">
          <Image
            src={asset(block.src)}
            alt={block.alt}
            fill
            quality={82}
            sizes={DETAIL_SIZES}
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}

export default function TheHousePage() {
  return (
    <main className="house flex flex-col gap-[var(--space-section)] pt-[var(--space-section)]">
      <h1 className="sr-only">The House</h1>

      {/* Sets up the sequence, at the rail measure the room copy uses. */}
      <section>
        <Reveal className="house-rail">
          <p className="house-copy text-note text-ink/80">{houseIntro}</p>
        </Reveal>
      </section>

      {houseSequence.map((block, i) =>
        block.kind === "plate" ? (
          <Plate key={block.src} block={block} priority={i === 0} />
        ) : (
          <Detail key={block.src} block={block} />
        )
      )}
    </main>
  );
}
