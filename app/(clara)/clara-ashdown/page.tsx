import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/clara/Hero";
import { asset, claraPath } from "@/lib/clara/paths";
import { entryNumber, journal } from "@/lib/clara/journal";

const firstEntry = journal[0];

export default function ClaraHome() {
  return (
    <>
      <Hero />

      {/*
        The excerpt: a paragraph of the journal set as a printed page would
        set it, against a single photograph. One image, not a grid of them.
      */}
      <section className="mx-auto grid max-w-clara-content items-center gap-6 px-[var(--gutter)] py-[var(--space-section)] md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <div>
          <p className="dropcap max-w-[46ch] font-clara-display text-[clamp(19px,2vw,23px)] font-light leading-[1.65] text-clara-ink">
            Every stone farmhouse i’ve worked on has an opinion about itself — where the
            light wants to fall, which wall was never meant to be plaster. my job is mostly
            to listen, and occasionally to disagree. a good restoration should look like
            nothing happened at all; like the house simply kept living, the way it always
            meant to.
          </p>

          <p className="clear-both pt-4 text-clara-meta text-clara-stone">
            from the journal, {entryNumber(firstEntry.number).toLowerCase()}
          </p>

          <Link
            href={claraPath("/journal")}
            className="group mt-4 inline-block border-b border-clara-stone pb-px text-clara-nav text-clara-ink transition-[letter-spacing] duration-300 ease-out hover:tracking-[0.03em]"
          >
            read the journal →
          </Link>
        </div>

        {/* On a phone the photograph leads, and the paragraph follows it. */}
        <div className="relative order-first aspect-[16/10] overflow-hidden md:order-none md:aspect-[4/5]">
          <Image
            src={asset("/images/home-excerpt.jpg")}
            alt="A rustic kitchen with worn wooden cabinetry, lit from one side."
            fill
            quality={82}
            sizes="(min-width: 760px) 45vw, 100vw"
            className="object-cover saturate-[0.94] brightness-[0.98]"
          />
        </div>
      </section>
    </>
  );
}
