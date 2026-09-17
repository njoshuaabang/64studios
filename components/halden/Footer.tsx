import { headers } from "next/headers";
import { studioUrl } from "@/lib/sites";

const linkStyle =
  "text-halden-brass underline-offset-4 transition-colors duration-300 hover:underline";

/**
 * The disclosure link goes to Halden's own case study, not to the 64 Studios
 * home page. Someone reading this line is asking what this site is, and the
 * page that answers that is the write-up of this project — the home page
 * makes them go and find it.
 *
 * studioUrl keeps that working from either door: an absolute URL on
 * halden.64studios.design, a root-relative path on the main host, where it
 * stays a client navigation.
 */
export default async function Footer() {
  const back = studioUrl((await headers()).get("host"), "/portfolio/halden");

  return (
    <footer className="w-full px-[var(--gutter)] pb-6 pt-[var(--space-section)]">
      <div className="border-t border-halden-brass/70 pt-4">
        <address className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-halden-small not-italic">
          <span>18 Marylebone, London W1</span>
          <a href="mailto:enquiries@halden.london" className={linkStyle}>
            enquiries@halden.london
          </a>
          {/* The particulars as a printed document. No file yet, so the link
              is a placeholder rather than a dead download. */}
          <a href="#" className={linkStyle}>
            Particulars (PDF)
          </a>
        </address>

        <p className="pt-10 text-halden-micro text-halden-ink/70">A Colebrook restoration.</p>

        <p className="pt-2 text-halden-nano text-halden-ink/60">
          Self-initiated concept.{" "}
          <a href={back} className={linkStyle}>
            64 Studios
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
