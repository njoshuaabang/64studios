import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";
import TransitionLink from "@/components/TransitionLink";
import { entries, getEntry, type JournalEntry } from "@/config/journal";
import { SITE_URL } from "@/lib/site";
import { INLINE_LINK } from "@/lib/underline";

export function generateStaticParams() {
  return entries.map((entry) => ({ slug: entry.slug }));
}

/**
 * Links the first mention of the project to its case study, in the sentence
 * where the entry first names it. An entry that discusses a decision made on
 * a project and never points at that project wastes both pages, and a
 * "related work" module at the foot would be the version of this that nobody
 * reads.
 *
 * Only the first occurrence is linked. The name recurs several times in a
 * piece of this length, and linking every instance would turn the prose into
 * a list of links.
 */
function withProjectLink(paragraph: string, entry: JournalEntry) {
  const at = paragraph.indexOf(entry.project);
  if (at === -1) return paragraph;

  return (
    <>
      {paragraph.slice(0, at)}
      <TransitionLink href={`/portfolio/${entry.projectSlug}`} className={INLINE_LINK}>
        {entry.project}
      </TransitionLink>
      {paragraph.slice(at + entry.project.length)}
    </>
  );
}

type PageParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return { title: "Journal" };

  const title = `${entry.title} — 64 Studios`;
  return {
    title: { absolute: title },
    description: entry.summary,
    alternates: { canonical: `/journal/${entry.slug}` },
    openGraph: {
      type: "article",
      title,
      description: entry.summary,
      url: `/journal/${entry.slug}`,
      publishedTime: entry.published,
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function JournalEntryPage({ params }: PageParams) {
  const { slug } = await params;
  const entry = getEntry(slug);

  if (!entry) {
    notFound();
  }

  const url = `${SITE_URL}/journal/${entry.slug}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.published,
    dateModified: entry.published,
    author: { "@type": "Organization", name: "64 Studios", url: SITE_URL },
    publisher: { "@type": "Organization", name: "64 Studios", url: SITE_URL },
    mainEntityOfPage: url,
    // Absolute, because a consumer reading the JSON-LD on its own has no base
    // to resolve a root-relative path against.
    ...(entry.images?.length
      ? { image: entry.images.map((i) => `${SITE_URL}${i.src}`) }
      : {}),
    about: entry.project,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "64 Studios", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
      { "@type": "ListItem", position: 3, name: entry.title, item: url },
    ],
  };

  // The first paragraph that names the project is the one that carries the
  // link. -1 when the body never names it, in which case nothing is linked.
  const linkParagraph = entry.body.findIndex((p) => p.includes(entry.project));
  const images = entry.images ?? [];

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-5xl px-4 md:px-6">
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />

      <article className="pb-[6vh] pt-[6vh]">
        <TransitionLink
          href="/journal"
          className="inline-block py-2 font-body text-[11px] uppercase tracking-[0.25em] text-ink"
        >
          ← Journal
        </TransitionLink>

        <div className="mt-6">
          <p className="font-body text-[11px] uppercase tracking-[0.5em] text-ink">
            {entry.project}
          </p>
          <h1 className="mt-3 max-w-[26ch] font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.3] text-ink">
            {entry.title}
          </h1>
          <time dateTime={entry.published} className="mt-3 block font-body text-sm text-ink/80">
            {dateFormat.format(new Date(entry.published))}
          </time>
        </div>

        <div className="mt-8">
          {entry.body.map((paragraph, index) => (
            <Fragment key={paragraph.slice(0, 40)}>
              <p className="mt-4 max-w-[68ch] font-body text-base leading-[1.7] text-ink first:mt-0">
                {index === linkParagraph ? withProjectLink(paragraph, entry) : paragraph}
              </p>
              {images
                .filter((image) => image.after === index)
                .map((image) => (
                  <figure key={image.src} className="mt-8 max-w-[68ch]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        // The figure is capped at the prose measure, which
                        // renders 743px wide once the body face resolves; 640
                        // here made the browser upscale a 640px source. Below
                        // the md breakpoint the figure is the full column.
                        sizes="(max-width: 768px) 100vw, 768px"
                        // Only the first image, and only because it is above
                        // the fold on both the desktop and phone widths this
                        // was measured at. The second is well below it.
                        priority={image === images[0]}
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 font-body text-[13px] leading-[1.6] text-ink/80">
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
            </Fragment>
          ))}
        </div>
      </article>

      <div className="border-t border-bone pb-[6vh] pt-8">
        <NewsletterSignup />
      </div>
    </main>
  );
}
