"use client";

import TransitionLink from "./TransitionLink";

const links = [
  { href: "/portfolio", label: "Projects" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export default function CornerNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-3 py-3 md:px-4 md:py-4"
    >
      <TransitionLink
        href="/"
        aria-label="64 Studios — Home"
        className="font-display text-sm font-bold text-ink"
      >
        64.
      </TransitionLink>
      <ul className="flex items-center gap-4 md:gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <TransitionLink
              href={link.href}
              className="group grid font-body text-[11px] uppercase text-ink"
            >
              {/* Invisible copy at hover tracking reserves the width, so one
                  link's hover never reflows its neighbours. */}
              <span aria-hidden="true" className="invisible col-start-1 row-start-1 tracking-[0.3em]">
                {link.label}
              </span>
              <span className="col-start-1 row-start-1 tracking-[0.2em] transition-[letter-spacing] duration-400 group-hover:tracking-[0.3em]">
                {link.label}
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
