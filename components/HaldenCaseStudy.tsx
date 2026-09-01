import Image from "next/image";
import VisitSiteButton from "./VisitSiteButton";
import type { Project, ProjectImage } from "@/config/portfolio";

/**
 * Halden gets its own layout rather than the shared CaseStudyLayout: it carries
 * full-bleed photography, decision notes and credits that the other projects
 * have no use for. Everything here is 64's own type, palette and spacing —
 * none of Halden's.
 */

const siteShots: ProjectImage[] = [
  {
    src: "/portfolio/halden/site-01.jpg",
    width: 1440,
    height: 900,
    alt: "The Halden enquiry page: a photograph of a panelled corridor fills the left half of the screen, with a three-field enquiry form set in the cream space on the right.",
  },
  {
    src: "/portfolio/halden/site-02.jpg",
    width: 2880,
    height: 1800,
    alt: "The Halden house page: a short column of text about the building's history sits to the left of a large photograph of the stone staircase and chequerboard hall floor.",
  },
  {
    src: "/portfolio/halden/site-03.jpg",
    width: 2880,
    height: 1800,
    alt: "The Halden homepage: the wordmark, the word Marylebone and a single ENTER link centred over a dimmed photograph of the black front door.",
  },
];

const photography: ProjectImage[] = [
  {
    src: "/portfolio/halden/hall.jpg",
    width: 2560,
    height: 1911,
    alt: "The entrance hall at Halden — a stone staircase curving up past a tall window, above a black and white chequerboard marble floor.",
  },
  {
    src: "/portfolio/halden/bar.jpg",
    width: 2560,
    height: 1911,
    alt: "The bar at Halden — a walnut counter with a marble top and six oxblood leather stools, in a room panelled and painted deep green.",
  },
  {
    src: "/portfolio/halden/library.jpg",
    width: 1911,
    height: 2560,
    alt: "The library at Halden — a worn oxblood leather armchair and a brass reading lamp in front of floor-to-ceiling shelves of old books.",
  },
];

const facts: { label: string; value: string }[] = [
  { label: "Client", value: "Self-initiated" },
  { label: "Year", value: "2026" },
  { label: "Scope", value: "Brand identity, art direction, photography, website" },
  { label: "Build", value: "Next.js, GSAP, Vercel" },
];

const notes: { label: string; body: string }[] = [
  {
    label: "The threshold.",
    body: "The homepage is a single held frame that does not scroll. The door fades in, the name follows, and then the page stops moving. Everything a visitor is given is the name, the street and a way in.",
  },
  {
    label: "One rule for motion.",
    body: "Images and text fade up sixteen pixels, once, over 1.2 seconds. There is no parallax, no cursor effect and no hover state on a photograph. In a house this quiet, movement is the only thing that could make it feel cheap.",
  },
  {
    label: "Writing that withholds.",
    body: "The copy states facts and lets the reader draw the conclusion — three thousand volumes, most of them unread; it opens at four and closes when it closes. Nothing is bespoke, curated or elevated.",
  },
];

const shell = "mx-auto w-full max-w-4xl px-4 md:px-6";

export default function HaldenCaseStudy({ project }: { project: Project }) {
  const cover = project.cover!;

  return (
    <article className="pb-20 pt-10 md:pt-12">
      {/* 1 — cover, full bleed, no overlay text */}
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        priority
        sizes="100vw"
        className="h-auto w-full"
      />

      <header className={`${shell} mt-6 md:mt-8`}>
        <h1 className="font-display text-3xl font-bold text-ink md:text-5xl">{project.title}</h1>
        <p className="mt-2 font-body text-sm text-ink md:text-base">{project.descriptor}</p>
        <VisitSiteButton url={project.url} className="mt-6" />
      </header>

      {/* 2 — intro */}
      <div className={`${shell} mt-8 md:mt-10`}>
        <p className="max-w-[46ch] font-display text-xl font-medium leading-[1.5] text-ink md:text-2xl">
          Most private clubs sell themselves in the language of a hotel. Halden is a house in
          Marylebone that behaves like one — a black door, six stools at the bar, twelve places at
          one table. The identity and the site were built to withhold rather than persuade.
        </p>
      </div>

      {/* 3 — metadata */}
      <div className={`${shell} mt-10 md:mt-12`}>
        <dl className="grid grid-cols-1 gap-6 border-t border-bone pt-6 sm:grid-cols-2">
          {facts.map(({ label, value }) => (
            <div key={label}>
              <dt className="font-body text-[10px] uppercase tracking-[0.25em] text-ink">
                {label}
              </dt>
              <dd className="mt-1 font-body text-sm text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 4 — the site itself */}
      {/*
        All three shots are 16:10, so the row lines up on their own ratio —
        no crop needed, unlike the room photography. Stacks below md, where a
        third of the width would render the interface unreadable.
      */}
      <div className="mt-16 grid grid-cols-1 md:mt-20 md:grid-cols-3">
        {siteShots.map((shot) => (
          <div key={shot.src} className="relative aspect-[16/10]">
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* 5 — decision notes */}
      <div className={`${shell} mt-16 flex flex-col gap-10 md:mt-20 md:gap-12`}>
        {notes.map(({ label, body }) => (
          <section key={label}>
            <h2 className="max-w-[16ch] font-display text-lg font-semibold leading-snug text-ink md:text-xl">
              {label}
            </h2>
            <p className="mt-2 max-w-[58ch] font-body text-base leading-relaxed text-ink">{body}</p>
          </section>
        ))}
      </div>

      {/* 6 — photography */}
      <section className="mt-16 md:mt-20">
        <p className={`${shell} font-body text-sm text-ink`}>
          Twelve images were made for the house. No stock.
        </p>
        {/*
          One flush row of three across the full bleed. The rooms were shot in
          both orientations, so a shared square crop is what lets them sit in a
          band together; below md the row would leave each image ~125px wide, so
          it stacks instead — still flush, still square.
        */}
        <div className="mt-6 grid grid-cols-1 md:mt-8 md:grid-cols-3">
          {photography.map((photo) => (
            <div key={photo.src} className="relative aspect-square">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 7 — close */}
      <footer className={`${shell} mt-16 md:mt-20`}>
        <VisitSiteButton url={project.url} />
        <p className="mt-8 font-body text-sm text-ink">
          Design, art direction, photography, copy and build — 64 Studios
        </p>
        <p className="mt-2 font-body text-xs text-ink opacity-[0.65]">Self-initiated concept.</p>
      </footer>
    </article>
  );
}
