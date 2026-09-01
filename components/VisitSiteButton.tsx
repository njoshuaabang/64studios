import SiteButton from "./SiteButton";

const LABEL = "Visit the site";

/**
 * The one way to link out to a live project.
 *
 * New-tab behaviour, the rel pair and the affordance all live here rather than
 * at the call site, so a new case study inherits the lot by using this instead
 * of remembering to pass three props to SiteButton. Renders nothing when the
 * project has no live site, which is the common case for older entries.
 */
export default function VisitSiteButton({
  url,
  className = "",
}: {
  /** `project.url` from config/portfolio. */
  url?: string;
  className?: string;
}) {
  if (!url) return null;

  return (
    <SiteButton
      href={url}
      newTab
      className={className}
      // Begins with the visible label, so voice control still matches on
      // "visit the site" (WCAG 2.5.3 Label in Name).
      ariaLabel={`${LABEL} (opens in a new tab)`}
    >
      {LABEL}
      {/*
        Decorative — the accessible name above already carries the warning.
        U+2197 is in Satoshi at both weights, so it inherits the button's ink
        and inverts on hover with no new asset or colour. The negative right
        margin cancels the trailing 0.25em tracking so the pair sits centred.
      */}
      <span
        aria-hidden="true"
        className="ml-[0.4em] -mr-[0.25em] text-[1.15em] leading-none"
      >
        ↗
      </span>
    </SiteButton>
  );
}
