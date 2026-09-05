"use client";

import TransitionLink from "./TransitionLink";

/**
 * The site's first boxed button. Everything else here is a text link with an
 * underline draw, so this stays deliberately quiet: a 1px ink rule — the same
 * hairline as the wordmark and the section rules — inverting to solid ink on
 * hover, on the site's standard 400ms ease-out.
 *
 * `newTab` drops to a plain anchor: TransitionLink calls preventDefault and
 * pushes through the client router, which would swallow target="_blank".
 */
export default function SiteButton({
  href,
  children,
  newTab = false,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
  className?: string;
  /** Overrides the visible label for assistive tech. */
  ariaLabel?: string;
}) {
  const styles = `inline-flex items-center justify-center border border-ink px-4 py-2 font-body text-xs uppercase tracking-[0.25em] text-ink transition-colors duration-400 ease-out hover:bg-ink hover:text-background ${className}`;

  if (newTab) {
    return (
      <a
        href={href}
        className={styles}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <TransitionLink href={href} className={styles} aria-label={ariaLabel}>
      {children}
    </TransitionLink>
  );
}
