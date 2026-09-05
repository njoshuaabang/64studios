import TransitionLink from "./TransitionLink";
import SocialLinks from "./SocialLinks";

/**
 * The footer for 64 Studios' own pages. Not the homepage: that is a single
 * locked viewport with nothing below the fold, so a footer there would either
 * force a scroll or sit inside the composition.
 *
 * The wordmark's spacing is CSS tracking, not literal spaces between the
 * characters — a screen reader must announce "64 Studios", not the letters one
 * at a time.
 */
const pages = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/journal", label: "Journal" },
];

export default function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 pt-[12vh] md:px-6">
      <TransitionLink
        href="/"
        className="inline-block font-body text-[11px] uppercase tracking-[0.35em] text-ink"
      >
        64 Studios
      </TransitionLink>

      {/* The pages that are not in the corner nav. Keeping the nav to three
          items is a design decision; these still need to be reachable, and
          from here every one of them is two clicks from the homepage. */}
      <nav aria-label="More" className="mt-4">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 font-body text-sm text-ink">
          {pages.map((page) => (
            <li key={page.href}>
              <TransitionLink
                href={page.href}
                className="inline-block py-1 underline decoration-ink/35 underline-offset-4 transition-colors duration-200 hover:decoration-ink focus-visible:decoration-ink motion-reduce:transition-none"
              >
                {page.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-4 font-body text-sm text-ink">
        <a
          href="mailto:studio@64studios.design"
          className="underline decoration-ink/35 underline-offset-4 transition-colors duration-200 hover:decoration-ink focus-visible:decoration-ink motion-reduce:transition-none"
        >
          studio@64studios.design
        </a>
      </p>

      <p className="mt-4 font-body text-sm text-ink">
        <SocialLinks />
      </p>

      <p className="mt-4 font-body text-sm text-ink">&copy; 2026</p>
    </footer>
  );
}
