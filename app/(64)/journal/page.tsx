import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TransitionLink from "@/components/TransitionLink";
import NewsletterSignup from "@/components/NewsletterSignup";
import { entries } from "@/config/journal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Journal — 64 Studios" },
  description:
    "Notes on single decisions made while designing and building the studio's own projects. One decision per entry, with the reasoning and the cost.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal — 64 Studios",
    description:
      "Notes on single decisions made while designing and building the studio's own projects.",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "64 Studios", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
  ],
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function JournalPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-5xl px-4 md:px-6">
      <JsonLd data={breadcrumb} />

      <header className="pb-[2vh] pt-[6vh]">
        <div aria-hidden="true" className="h-px w-12 bg-ink" />
        <h1 className="mt-3 max-w-[22ch] font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.3] text-ink">
          Notes on the work
        </h1>
        <p className="mt-6 max-w-[58ch] font-body text-base leading-[1.6] text-ink">
          One decision per entry, taken from a real project, with the reasoning and what it cost.
          Not a blog about design in general.
        </p>
      </header>

      <ul className="pt-[2vh]">
        {entries.map((entry) => (
          <li key={entry.slug} className="border-t border-bone py-6 first:border-t-0">
            <article>
              <p className="font-body text-[11px] uppercase tracking-[0.5em] text-ink">
                {entry.project}
              </p>
              <h2 className="mt-3 max-w-[30ch] font-display text-xl font-semibold leading-[1.3] text-ink md:text-2xl">
                <TransitionLink href={`/journal/${entry.slug}`} className="hover:underline">
                  {entry.title}
                </TransitionLink>
              </h2>
              <p className="mt-3 max-w-[58ch] font-body text-base leading-[1.6] text-ink">
                {entry.summary}
              </p>
              <time
                dateTime={entry.published}
                className="mt-3 block font-body text-sm text-ink/80"
              >
                {dateFormat.format(new Date(entry.published))}
              </time>
            </article>
          </li>
        ))}
      </ul>

      <div className="border-t border-bone pb-[6vh] pt-8">
        <NewsletterSignup />
      </div>
    </main>
  );
}
