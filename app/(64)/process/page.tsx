import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TransitionLink from "@/components/TransitionLink";
import { SITE_URL } from "@/lib/site";

const PROSE = "max-w-[58ch] font-body text-base leading-[1.6] text-ink";
const STAGE_NUMBER = "font-body text-[11px] uppercase tracking-[0.5em] text-ink";
const STAGE_TITLE = "mt-2 font-display text-xl font-semibold leading-[1.3] text-ink";
const WHEN = "mt-1 font-body text-sm text-ink/80";

export const metadata: Metadata = {
  title: { absolute: "How a Project Runs — 64 Studios" },
  description:
    "The one-to-two-week engagement, stage by stage: what happens, what is needed from you, and what you get at handover.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "How a Project Runs — 64 Studios",
    description:
      "The one-to-two-week engagement, stage by stage: what happens, what is needed from you, and what you get at handover.",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "64 Studios", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Process", item: `${SITE_URL}/process` },
  ],
};

/**
 * The stages are genuinely sequential and dated, so numbering them is
 * information rather than decoration — which is the only reason it is here.
 */
function Stage({
  number,
  title,
  when,
  children,
}: {
  number: string;
  title: string;
  when: string;
  children: React.ReactNode;
}) {
  const id = `stage-${number}`;
  return (
    <section aria-labelledby={id} className="pt-[4vh] md:grid md:grid-cols-12 md:gap-6">
      <div className="md:col-span-3">
        <p className={STAGE_NUMBER}>{number}</p>
        <h2 id={id} className={STAGE_TITLE}>
          {title}
        </h2>
        <p className={WHEN}>{when}</p>
      </div>
      <div className="mt-4 md:col-span-8 md:col-start-5 md:mt-0">{children}</div>
    </section>
  );
}

export default function ProcessPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-5xl px-4 md:px-6">
      <JsonLd data={breadcrumb} />

      <header className="pb-[2vh] pt-[6vh]">
        <div aria-hidden="true" className="h-px w-12 bg-ink" />
        <h1 className="mt-3 max-w-[22ch] font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.3] text-ink">
          How a project runs, start to finish
        </h1>
        <p className={`mt-6 ${PROSE}`}>
          A project takes one to two weeks from first conversation to launch. That is possible
          because the studio runs one project at a time, not because a stage is skipped. What
          follows is what actually happens in that window, in the order it happens, and what is
          needed from you at each point.
        </p>
      </header>

      <Stage number="00" title="Before the clock starts" when="A conversation, then a start date">
        <p className={PROSE}>
          Nothing begins with a brief document. It begins with a conversation long enough to hear
          what the business actually is and who it is losing to. That conversation is free, and it
          is where most of the useful decisions get made.
        </p>
        <p className={`mt-3 ${PROSE}`}>
          What is needed before the window opens is small: whatever already exists of the brand,
          and access to the domain. If there is photography worth keeping, it helps to see it
          early. If there is none, that is an ordinary starting point and is dealt with in stage
          two.
        </p>
      </Stage>

      <Stage number="01" title="The identity" when="Days one to three">
        <p className={PROSE}>
          The mark is drawn first, then the type it sits in, then the palette that has to hold its
          contrast at small sizes. It is shown once, in full, applied to real surfaces rather than
          floating on a white board.
        </p>
        <p className={`mt-3 ${PROSE}`}>
          One direction is shown, not three. A studio that offers three has usually only believed
          in one, and asking a client to pick between two it does not believe in is a way of moving
          the decision rather than making it.
        </p>
        <p className={`mt-3 ${PROSE}`}>
          What is needed from you here is a decision, and where something is wrong, a specific
          reason. &ldquo;Make it pop&rdquo; costs a day. &ldquo;The mark disappears against our
          packaging&rdquo; costs an hour.
        </p>
      </Stage>

      <Stage number="02" title="The site, drawn" when="Days three to five">
        <p className={PROSE}>
          The site is drawn from the identity rather than designed separately and matched to it
          afterwards. Layout and the behaviour of every state are decided here: what a page does on
          a phone, what a link does on hover, what the page looks like while an image is still
          loading.
        </p>
        <p className={`mt-3 ${PROSE}`}>
          Nothing is drawn that cannot be built. That is the advantage of drawing and building
          inside one studio, with no stage where a design goes over a wall and comes back as an
          approximation of itself.
        </p>
      </Stage>

      <Stage number="03" title="The build" when="Days five to nine">
        <p className={PROSE}>
          The front end is written in Next.js. Motion is added in GSAP where it earns its place and
          left out everywhere else. Images are compressed and sized properly, because a site that
          loads slowly on a phone has already lost the visitor it was built for.
        </p>
        <p className={`mt-3 ${PROSE}`}>
          You watch it on a real URL while it is being built, not in a slideshow. Feedback is
          cheapest at this stage: changing a decision in the second week costs more than changing
          it in the first.
        </p>
      </Stage>

      <Stage number="04" title="Launch" when="Day nine or ten">
        <p className={PROSE}>
          The domain is pointed, the analytics are connected, and the site goes live. Launch sits
          inside the window rather than after it, which is the part most quoted timelines quietly
          leave out.
        </p>
        <p className={`mt-3 ${PROSE}`}>
          What you get at handover is the live site and the identity files in the formats they are
          actually used in. There is also a short written note on what was decided and why. That
          note matters more than it sounds: it is what stops the next person who touches the site
          from undoing a decision without knowing it was one.
        </p>
      </Stage>

      <Stage number="05" title="After launch" when="The first month, and after it">
        <p className={PROSE}>
          The site is yours, on your own Vercel account if you would rather it lived there. Nothing
          is held hostage. There is no proprietary builder to keep paying for and no licence to
          expire.
        </p>
        <p className={`mt-3 ${PROSE}`}>
          Small changes in the first month are part of the project rather than a new one. After
          that, work is quoted as it comes.
        </p>
        <p className={`mt-3 ${PROSE}`}>
          The studio does not sell a retainer by default. Most sites of this kind need very little
          in their first year, and a retainer sold against work that is not needed is a
          subscription rather than a service.
        </p>
      </Stage>

      <footer className="pb-[6vh] pt-[5vh]">
        <TransitionLink
          href="/contact"
          className="group inline-flex items-center py-2 font-body text-xs uppercase tracking-[0.25em] text-ink"
        >
          <span className="relative pb-1">
            Begin a conversation
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-400 ease-out group-hover:scale-x-100" />
          </span>
        </TransitionLink>
      </footer>
    </main>
  );
}
