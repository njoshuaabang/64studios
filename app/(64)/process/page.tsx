import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TransitionLink from "@/components/TransitionLink";
import { faqs } from "@/config/faq";
import { SITE_URL } from "@/lib/site";
import { UNDERLINE } from "@/lib/underline";

const PROSE = "max-w-[58ch] font-body text-base leading-[1.6] text-ink";
const STAGE_NUMBER = "font-body text-[12px] uppercase tracking-[0.5em] text-ink";
const STAGE_TITLE = "mt-2 font-display text-xl font-semibold leading-[1.3] text-ink";
const SECTION_HEADING = "font-display text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-[1.3] text-ink";
const OFFER_HEADING = "font-display text-lg font-semibold leading-[1.35] text-ink";

export const metadata: Metadata = {
  title: { absolute: "How a website project runs, and what it costs — 64 Studios" },
  description:
    "How a project runs and what it costs: the Website Week at £7,000, or a website from £3,000. For interior designers, architects and builders.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "How a website project runs, and what it costs — 64 Studios",
    description:
      "How a project runs and what it costs: the Website Week at £7,000, or a website from £3,000. For interior designers, architects and builders.",
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

/** Built from the same array that renders the questions, so the two cannot drift. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

/**
 * The six stages are sequential, so numbering them is information rather than
 * decoration — which is the only reason it is here.
 */
function Stage({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  const id = `stage-${number}`;
  return (
    <section aria-labelledby={id} className="pt-[4vh] md:grid md:grid-cols-12 md:gap-6">
      <div className="md:col-span-3">
        <p className={STAGE_NUMBER}>{number}</p>
        <h3 id={id} className={STAGE_TITLE}>
          {title}
        </h3>
      </div>
      <div className="mt-4 md:col-span-8 md:col-start-5 md:mt-0">{children}</div>
    </section>
  );
}

/** The two offers a visitor can act on, each with its own next step. */
function OfferLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <TransitionLink
      href={href}
      className="group mt-4 inline-flex items-center py-2 font-body text-xs uppercase tracking-[0.25em] text-ink"
    >
      <span className="relative pb-1">
        {children}
        <span className={UNDERLINE} />
      </span>
    </TransitionLink>
  );
}

const worksFor = [
  "Interior designers",
  "Architects",
  "Builders and design-and-build firms",
  "Kitchen, joinery and furniture makers",
  "Garden and landscape designers",
  "Developers of small residential schemes",
];

export default function ProcessPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-5xl px-4 pt-16 md:px-6 md:pt-20">
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqSchema} />

      <div className="pb-[2vh]">
        <div aria-hidden="true" className="h-px w-12 bg-bone" />
        <h1 className="mt-3 max-w-[22ch] font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.3] text-ink">
          How a project runs, start to finish
        </h1>
        <p className={`mt-6 ${PROSE}`}>
          Every project follows the same six stages. The Website Week, described below, fits the
          build into five fixed days.
        </p>
      </div>

      <Stage number="00" title="The conversation">
        <p className={PROSE}>
          Free, and where most of the decisions get made: what the business does, and which projects
          it wants to be known for.
        </p>
      </Stage>

      <Stage number="01" title="The content">
        <p className={PROSE}>
          Photographs of your best projects with a line or two about each, and access to the domain.
          The studio sends a short list of exactly what is needed. Nothing starts until it is in,
          because a site built around missing photographs gets built twice.
        </p>
      </Stage>

      <Stage number="02" title="The direction">
        <p className={PROSE}>
          One design direction, shown on your own projects rather than placeholder images, and
          agreed before any code is written.
        </p>
      </Stage>

      <Stage number="03" title="The build">
        <p className={PROSE}>
          Next.js, on a live link you can open at any point. Images are sized for phones, because
          most of your clients will see the site on one first.
        </p>
      </Stage>

      <Stage number="04" title="Launch">
        <p className={PROSE}>
          The site goes live on your domain, with analytics connected. A Website Week site also
          comes with a short recorded walkthrough of the editor.
        </p>
      </Stage>

      <Stage number="05" title="After launch">
        <p className={PROSE}>
          Small changes in the first month are included. After that, the care plan covers hosting
          and updates. The site is yours either way, and can move to your own account at any point.
        </p>
      </Stage>

      <section aria-labelledby="who" className="pt-[7vh] md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-3">
          <h2 id="who" className={SECTION_HEADING}>
            Who the studio works for
          </h2>
        </div>
        <div className="mt-4 md:col-span-8 md:col-start-5 md:mt-0">
          <ul className="flex flex-col gap-3">
            {worksFor.map((item) => (
              <li key={item} className="flex max-w-[58ch] gap-3 font-body text-base leading-[1.6] text-ink">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-bone" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-6 ${PROSE}`}>
            The studio does not build online shops, or sites that depend on a team publishing every
            week.
          </p>
        </div>
      </section>

      {/* The id the spec asks for, so /process#fees can be linked to directly. */}
      <section aria-labelledby="fees-heading" id="fees" className="scroll-mt-24 pt-[7vh]">
        <div className="md:grid md:grid-cols-12 md:gap-6">
          <div className="md:col-span-3">
            <h2 id="fees-heading" className={SECTION_HEADING}>
              Websites, and what they cost
            </h2>
          </div>
          <div className="mt-4 md:col-span-8 md:col-start-5 md:mt-0">
            <p className={PROSE}>
              The studio makes websites and nothing else. Every site is drawn from scratch and built
              by hand.
            </p>

            {/* The Week leads. It is the larger commitment, and reading it first
                is what makes the £3,000 option read as the smaller one. */}
            <div className="mt-10 border-t border-bone pt-6">
              <h3 className={OFFER_HEADING}>The Website Week — £7,000</h3>
              <p className={`mt-3 ${PROSE}`}>
                One fixed week, Monday to Friday, booked in advance. The studio takes on nothing
                else that week.
              </p>
              <p className={`mt-3 ${PROSE}`}>
                The week before, the design direction is agreed and your photographs and project
                list come in. The build starts on Monday, and each evening you get a short video of
                the day&rsquo;s progress.
              </p>
              <p className={`mt-3 ${PROSE}`}>
                Up to ten pages, with the copy written together. It comes with an editor, so you can
                add new projects yourself. With everything in the week before, the site is live by
                Friday, or the second half of the fee is waived.
              </p>
              <OfferLink href="/contact?option=week">Book a Website Week</OfferLink>
            </div>

            <div className="mt-10 border-t border-bone pt-6">
              <h3 className={OFFER_HEADING}>A website — £3,000</h3>
              <p className={`mt-3 ${PROSE}`}>
                The first three commissions are £3,000. After that, £5,000.
              </p>
              <p className={`mt-3 ${PROSE}`}>
                Up to six pages, drawn and coded from scratch, set up for phones and for search. Two
                rounds of revisions. About three weeks from receiving your photographs to launch.
                New projects are added by the studio through the care plan.
              </p>
              <OfferLink href="/contact?option=website">Start a website</OfferLink>
            </div>

            <div className="mt-10 border-t border-bone pt-6">
              <h3 className={OFFER_HEADING}>Care — £200 a month</h3>
              <p className={`mt-3 ${PROSE}`}>
                Hosting, updates, backups and up to two new projects added for you each month.
                Cancel with 30 days&rsquo; notice.
              </p>
            </div>

            <p className={`mt-10 ${PROSE}`}>
              Additional pages are £200 each. Half the fee secures a start date, and the rest is due
              before launch. No VAT is added.
            </p>
          </div>
        </div>
      </section>

      {/* Prose, not an accordion: there are five of these and nothing is gained
          by hiding four behind a control. Every answer stays visible, for
          readers and for the engines that quote them. */}
      <section aria-labelledby="questions" className="pt-[7vh]">
        <div className="md:grid md:grid-cols-12 md:gap-6">
          <div className="md:col-span-3">
            <h2 id="questions" className={SECTION_HEADING}>
              Questions
            </h2>
          </div>
          <dl className="mt-4 md:col-span-8 md:col-start-5 md:mt-0">
            {faqs.map((item) => (
              <div key={item.q} className="mt-8 first:mt-0">
                <dt>
                  <h3 className="max-w-[46ch] font-display text-lg font-semibold leading-[1.35] text-ink">
                    {item.q}
                  </h3>
                </dt>
                <dd className={`mt-2 ${PROSE}`}>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="pb-[6vh] pt-[7vh]">
        <TransitionLink
          href="/contact"
          className="group inline-flex items-center py-2 font-body text-xs uppercase tracking-[0.25em] text-ink"
        >
          <span className="relative pb-1">
            Begin a conversation
            <span className={UNDERLINE} />
          </span>
        </TransitionLink>
      </div>
    </main>
  );
}
