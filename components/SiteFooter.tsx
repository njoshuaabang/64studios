import TransitionLink from "./TransitionLink";

/**
 * The footer for 64 Studios' own pages. Not the homepage: that is a single
 * locked viewport with nothing below the fold, so a footer there would either
 * force a scroll or sit inside the composition.
 *
 * The wordmark's spacing is CSS tracking, not literal spaces between the
 * characters — a screen reader must announce "64 Studios", not the letters one
 * at a time.
 */
// Exported so the Organization schema's `sameAs` (app/layout.tsx) reads these
// same three URLs rather than a second, separately-maintained copy.
const pages = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/journal", label: "Journal" },
];

export const social = [
  { href: "https://www.instagram.com/sixtyfour.studios/", label: "Instagram" },
  { href: "https://www.behance.net/64studios", label: "Behance" },
  { href: "https://www.linkedin.com/in/nkere-abang-698071434/", label: "LinkedIn" },
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
                className="inline-block py-1 underline decoration-transparent underline-offset-4 transition-colors duration-400 hover:decoration-ink"
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
          className="underline decoration-transparent underline-offset-4 transition-colors duration-400 hover:decoration-ink"
        >
          studio@64studios.design
        </a>
      </p>

      <p className="mt-4 font-body text-sm text-ink">
        {social.map((item, i) => (
          <span key={item.href}>
            {i > 0 ? <span aria-hidden="true"> &middot; </span> : null}
            <a
              href={item.href}
              rel="noreferrer"
              target="_blank"
              className="underline decoration-transparent underline-offset-4 transition-colors duration-400 hover:decoration-ink"
            >
              {item.label}
            </a>
          </span>
        ))}
      </p>

      <p className="mt-4 font-body text-sm text-ink">&copy; 2026</p>
    </footer>
  );
}
