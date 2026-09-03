"use client";

import TransitionLink from "./TransitionLink";

const links = [
  { href: "/portfolio", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export default function CornerNav() {
  return (
    /* The tracking is CSS, never literal spaces between letters: a screen
       reader must announce "Work", not "W O R K".

       It eases off below 640px. At 0.25em the three links ran to within a
       single pixel of the 64. mark on a 320px screen — touching it, with the
       hover state widening them further. The letter-spaced character is kept;
       only the amount gives way, and only where there is no room for it. */
    <nav
      aria-label="Primary"
      data-corner-nav
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-3 py-3 md:px-4 md:py-4"
    >
      <TransitionLink
        href="/"
        aria-label="64 Studios — Home"
        className="font-display text-sm font-bold text-ink"
      >
        64.
      </TransitionLink>
      <ul className="flex items-center gap-3 sm:gap-4 md:gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <TransitionLink
              href={link.href}
              className="group grid font-body text-[11px] uppercase text-ink"
            >
              {/* Invisible copy at hover tracking reserves the width, so one
                  link's hover never reflows its neighbours. */}
              <span aria-hidden="true" className="invisible col-start-1 row-start-1 tracking-[0.26em] sm:tracking-[0.35em]">
                {link.label}
              </span>
              <span className="col-start-1 row-start-1 tracking-[0.16em] transition-[letter-spacing] duration-400 group-hover:tracking-[0.26em] sm:tracking-[0.25em] sm:group-hover:tracking-[0.35em]">
                {link.label}
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
