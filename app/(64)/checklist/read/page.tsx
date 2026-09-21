import type { Metadata } from "next";
import TransitionLink from "@/components/TransitionLink";
import { checklist } from "@/config/checklist";
import { UNDERLINE, INLINE_LINK } from "@/lib/underline";

export const metadata: Metadata = {
  title: { absolute: "Before the enquiry — 64 Studios" },
  description: checklist.subtitle,
  // Reached from the delivery email and the sign-up page only. Not indexed,
  // not in the sitemap, not in the nav.
  robots: { index: false, follow: false },
};

const LABEL = "font-body text-[10px] uppercase tracking-[0.22em] text-ink/70";

/**
 * Rendered from config/checklist.ts, and printed from here to make the PDF —
 * so this page and the download are the same document, and a copy change is
 * one edit plus a re-export.
 *
 * On screen it sits in the site's chrome. In print that chrome goes and the
 * page supplies its own header and footer instead, so the sheet reads as a
 * document with the studio's name on it rather than a screenshot of a web
 * page. It must fit one A4 page; where it would spill, the vertical spacing
 * gives way, never the type size.
 */
export default function ChecklistReadPage() {
  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          html, body { background: #FDFCFB !important; }
          html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          [data-corner-nav], [data-site-footer], [data-page-transition], a[href="#main-content"] { display: none !important; }
        }
      `}</style>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-3xl px-4 pb-16 pt-16 md:px-6 md:pt-20 print:flex print:min-h-[296mm] print:max-w-none print:flex-col print:px-[15mm] print:pb-[11mm] print:pt-[12mm]"
      >
        {/* Print only: the sheet's own masthead, standing in for the nav. */}
        <div className="hidden items-baseline justify-between border-b border-bone pb-[3mm] print:flex">
          <span className="font-display text-[13px] font-bold text-ink">64.</span>
          <span className="font-body text-[9px] uppercase tracking-[0.3em] text-ink/70">
            A checklist from 64 Studios
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-6 print:mt-[5mm]">
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl print:text-[22px]">
            {checklist.title}
          </h1>
          <a
            href="/checklist/before-the-enquiry.pdf"
            className={`shrink-0 font-body text-sm text-ink print:hidden ${INLINE_LINK}`}
          >
            Download as PDF
          </a>
        </div>
        <p className="mt-3 max-w-[58ch] font-body text-base leading-relaxed text-ink print:mt-[2mm] print:text-[11.5px] print:leading-snug">
          {checklist.subtitle}
        </p>
        <p className="mt-2 max-w-[58ch] font-body text-sm leading-relaxed text-ink/80 print:mt-[1mm] print:text-[10px]">
          {checklist.howto}
        </p>

        <ol className="mt-8 border-t border-bone print:mt-[4mm]">
          {checklist.checks.map((check, i) => (
            <li
              key={check.title}
              className="grid grid-cols-[auto_auto_minmax(0,1fr)] gap-x-2 sm:gap-x-4 border-b border-bone py-5 print:gap-x-[3mm] print:py-[3.1mm]"
            >
              {/* An empty box to tick, with a pen. Decorative on screen; the
                  number and the title carry the meaning. */}
              <span
                aria-hidden="true"
                className="mt-[3px] h-2 w-2 border border-ink/60 print:mt-[1px] print:h-[3.2mm] print:w-[3.2mm]"
              />
              <span className="font-body text-sm tabular-nums text-ink/70 print:text-[10px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-base font-semibold leading-snug text-ink print:text-[11.5px]">
                  {check.title}
                </p>
                <dl className="mt-2 grid gap-y-1 print:mt-[0.8mm] print:gap-y-[0.4mm]">
                  <div className="grid sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-3 print:grid-cols-[14mm_1fr] print:gap-x-[2mm]">
                    <dt className={`pt-[3px] ${LABEL} print:pt-[1px] print:text-[7.5px]`}>Good</dt>
                    <dd className="font-body text-sm leading-relaxed text-ink print:text-[9.5px] print:leading-snug">
                      {check.good}
                    </dd>
                  </div>
                  <div className="grid sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-3 print:grid-cols-[14mm_1fr] print:gap-x-[2mm]">
                    <dt className={`pt-[3px] ${LABEL} print:pt-[1px] print:text-[7.5px]`}>If not</dt>
                    <dd className="font-body text-sm leading-relaxed text-ink/80 print:text-[9.5px] print:leading-snug">
                      {check.cost}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-[58ch] font-body text-base leading-relaxed text-ink print:mt-[5mm] print:pb-[5mm] print:text-[11px] print:leading-snug">
          {checklist.closing}
        </p>

        <TransitionLink
          href="/contact"
          className="group mt-6 inline-flex items-center py-2 font-body text-xs uppercase tracking-[0.25em] text-ink print:hidden"
        >
          <span className="relative pb-1">
            {checklist.cta}
            <span className={UNDERLINE} />
          </span>
        </TransitionLink>

        {/* Print only: where to find the studio, in place of the site footer.
            A link cannot be clicked on paper, so it is written out. */}
        <div className="hidden items-baseline justify-between border-t border-bone pt-[2.5mm] print:mt-auto print:flex">
          <span className="font-body text-[9.5px] text-ink">
            {checklist.cta} — 64studios.design/contact
          </span>
          <span className="font-body text-[9px] text-ink/70">
            studio@64studios.design · Sheffield, United Kingdom
          </span>
        </div>
      </main>
    </>
  );
}
