import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TransitionLink from "@/components/TransitionLink";
import { SITE_URL } from "@/lib/site";

const LABEL = "font-body text-[11px] uppercase tracking-[0.5em] text-ink";
const PROSE = "max-w-[58ch] font-body text-base leading-[1.6] text-ink";
const ITEM = "font-body text-base leading-[1.6] text-ink";

export const metadata: Metadata = {
  title: { absolute: "Brand Identity & Website Design — 64 Studios" },
  description:
    "What 64 Studios makes: brand identity, hand-coded websites in Next.js, and art direction. One project at a time, one to two weeks from first conversation to launch.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Brand Identity & Website Design — 64 Studios",
    description:
      "What 64 Studios makes: brand identity, hand-coded websites in Next.js, and art direction.",
  },
};

const provider = { "@type": "Organization", name: "64 Studios", url: SITE_URL };

/**
 * One Service block per offering rather than a single block listing all
 * three: a search engine or a model answering "who hand-codes websites"
 * should match the website service on its own terms, not have to unpick it
 * from a combined description.
 */
const services = [
  {
    serviceType: "Brand identity design",
    description:
      "Wordmark, typography, palette and art direction, drawn from scratch for one business rather than adapted from a template.",
  },
  {
    serviceType: "Website design and development",
    description:
      "Hand-coded websites built in Next.js and deployed on Vercel, with motion in GSAP. No templates and no page builders.",
  },
  {
    serviceType: "Art direction and photography",
    description:
      "Direction for a shoot, and selection and cropping of images as part of the layout rather than after it.",
  },
].map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: s.serviceType,
  description: s.description,
  provider,
  areaServed: ["GB", "Worldwide"],
}));

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "64 Studios", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
  ],
};

function Includes({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex max-w-[58ch] flex-col gap-2">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 ${ITEM}`}>
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-5xl px-4 md:px-6">
      {services.map((service) => (
        <JsonLd key={service.serviceType} data={service} />
      ))}
      <JsonLd data={breadcrumb} />

      <header className="pb-[3vh] pt-[6vh]">
        <div aria-hidden="true" className="h-px w-12 bg-ink" />
        <h1 className="mt-3 max-w-[20ch] font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.3] text-ink">
          Brand identity and website design
        </h1>
        <p className={`mt-6 ${PROSE}`}>
          64 Studios makes two things, and usually both at once: the identity a business is
          recognised by, and the site that carries it. All of it is drawn and built in the studio.
          Nothing is bought in, and nothing is assembled from a theme bought and adjusted.
        </p>
        <p className={`mt-3 ${PROSE}`}>
          The work below can be taken separately, and most of it is taken together, because an
          identity that never gets built and a site with no identity behind it are each half of a
          job.
        </p>
      </header>

      <div className="md:grid md:grid-cols-12 md:gap-6">
        <section aria-labelledby="identity-label" className="pt-[3vh] md:col-span-6">
          <h2 id="identity-label" className={LABEL}>
            Brand identity
          </h2>
          <p className={`mt-4 ${PROSE}`}>
            An identity is the part that survives a redesign. It has to hold at the size of a
            browser tab and at the size of a shopfront, in one colour when that is all there is,
            and in the hands of whoever needs to use it after the studio has gone.
          </p>
          <p className={`mt-3 ${PROSE}`}>
            The work starts with the mark and the type it sits in, because those two decide
            everything that comes after them. Colour follows from that, not before it. Nothing is
            handed over as a mood board for someone else to interpret.
          </p>
          <Includes
            items={[
              "Wordmark or monogram, drawn rather than set",
              "Typography: the faces, the weights, and the sizes they are used at",
              "Palette, with values that hold their contrast at small sizes",
              "Art direction: how photography and layout are expected to behave",
            ]}
          />
        </section>

        <section aria-labelledby="websites-label" className="pt-[3vh] md:col-span-5 md:col-start-8">
          <h2 id="websites-label" className={LABEL}>
            Websites
          </h2>
          <p className={`mt-4 ${PROSE}`}>
            Every site is written by hand. No templates, no page builders, no theme bought and
            adjusted until it stops looking like itself.
          </p>
          <p className={`mt-3 ${PROSE}`}>
            The stack is Next.js, deployed on Vercel, with GSAP where motion earns its place. That
            is not a fashion choice. It renders fast on a phone, it survives being handed to another
            developer, and it does not rest on a plugin that may stop being maintained.
          </p>
          <p className={`mt-3 ${PROSE}`}>
            A site built this way asks for more attention up front and less every year after.
          </p>
          <Includes
            items={[
              "Design drawn from the identity, not fitted to a template",
              "Hand-written front end in Next.js",
              "Motion in GSAP, where it earns its place",
              "Deployment on Vercel, with analytics connected",
            ]}
          />
        </section>
      </div>

      <div className="md:grid md:grid-cols-12 md:gap-6">
        <section aria-labelledby="art-label" className="pt-[4vh] md:col-span-6">
          <h2 id="art-label" className={LABEL}>
            Art direction and photography
          </h2>
          <p className={`mt-4 ${PROSE}`}>
            Photography is the fastest way to make a good business look ordinary. Most of what ends
            up on a website is either stock, or a shoot that went ahead without direction behind it.
          </p>
          <p className={`mt-3 ${PROSE}`}>
            The studio directs the shoot where there is one, and works with what already exists
            where there is not. Either way the images are chosen and cropped as part of the design
            rather than dropped into it afterwards.
          </p>
          <Includes
            items={[
              "Direction for a shoot: what to photograph, and how",
              "Selection and cropping treated as part of the layout",
              "Retouching to one consistent register",
              "Guidance for images added later, after handover",
            ]}
          />
        </section>

        <section aria-labelledby="for-label" className="pt-[4vh] md:col-span-5 md:col-start-8">
          <h2 id="for-label" className={LABEL}>
            Who this is for
          </h2>
          <p className={`mt-4 ${PROSE}`}>
            The studio works with businesses whose product is better than their website says it is.
          </p>
          <p className={`mt-3 ${PROSE}`}>
            That has most often meant hospitality &mdash; hotels, and the kind of house that would
            rather not be called one. Makers and product brands are the other regular: a workshop
            with a real object to sell and no good way to show it.
          </p>
          <p className={`mt-3 ${PROSE}`}>
            Professional practices are the third register, and the least well served by the web as
            it stands. An architecture practice or a law firm usually ends up with a site built from
            the same template as its competitors, which is a strange outcome for a business that
            sells judgement. The same goes for a clinic.
          </p>
          <p className={`mt-3 ${PROSE}`}>
            There is also work the studio turns down. Ecommerce at any real scale needs a different
            kind of build and someone to keep it fed afterwards. So does a site that depends on a
            content operation nobody has hired yet. A redesign whose brief is to look like a named
            competitor is a poor fit too, since the argument running through every page here is
            against precisely that.
          </p>
        </section>
      </div>

      <footer className="pb-[6vh] pt-[4vh]">
        <TransitionLink
          href="/process"
          className="group inline-flex items-center py-2 font-body text-xs uppercase tracking-[0.25em] text-ink"
        >
          <span className="relative pb-1">
            How a project runs
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-400 ease-out group-hover:scale-x-100" />
          </span>
        </TransitionLink>
      </footer>
    </main>
  );
}
