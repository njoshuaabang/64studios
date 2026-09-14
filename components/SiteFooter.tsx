import TransitionLink from "./TransitionLink";
import SocialLinks from "./SocialLinks";

/**
 * The footer for 64 Studios' own pages. Not the homepage: that is a single
 * locked viewport with nothing below the fold, so a footer there would either
 * force a scroll or sit inside the composition. FooterSlot gives that page a
 * minimal one instead.
 *
 * Two lines. The first says who and where, the second carries only what the
 * nav does not already hold — Work, Studio, Process and Contact are up there,
 * so repeating them here would be the same thing said twice.
 *
 * The wordmark's spacing is CSS tracking, not literal spaces between the
 * characters: a screen reader must announce "64 Studios", not the letters one
 * at a time.
 */
const LINK =
  "underline decoration-ink/35 underline-offset-4 transition-colors duration-200 hover:decoration-ink focus-visible:decoration-ink motion-reduce:transition-none";

export default function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 pt-[12vh] md:px-6">
      <p className="font-body text-sm text-ink">
        <TransitionLink
          href="/"
          className="font-body text-[11px] uppercase tracking-[0.35em] text-ink"
        >
          64 Studios
        </TransitionLink>
        <span aria-hidden="true" className="px-2 text-ink/50">
          ·
        </span>
        Sheffield, United Kingdom
        <span aria-hidden="true" className="px-2 text-ink/50">
          ·
        </span>
        <a href="mailto:studio@64studios.design" className={LINK}>
          studio@64studios.design
        </a>
      </p>

      <p className="mt-2 font-body text-sm text-ink">
        <TransitionLink href="/journal" className={LINK}>
          Journal
        </TransitionLink>
        <span aria-hidden="true" className="px-2 text-ink/50">
          ·
        </span>
        <SocialLinks />
        <span aria-hidden="true" className="px-2 text-ink/50">
          ·
        </span>
        &copy; 2026
      </p>
    </footer>
  );
}
