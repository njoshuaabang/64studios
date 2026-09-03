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
const social = [
  { href: "https://instagram.com/", label: "Instagram" },
  { href: "https://behance.net/", label: "Behance" },
  { href: "https://linkedin.com/", label: "LinkedIn" },
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

      <p className="mt-4 font-body text-sm text-ink">
        <a
          href="mailto:studio@64studios.com"
          className="underline decoration-transparent underline-offset-4 transition-colors duration-400 hover:decoration-ink"
        >
          studio@64studios.com
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
