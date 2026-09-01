"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { claraPath } from "@/lib/clara/paths";

const links = [
  { href: claraPath("/work"), label: "Work" },
  { href: claraPath("/journal"), label: "The Ashdown Journal" },
  { href: claraPath("/about"), label: "About" },
  { href: claraPath("/enquire"), label: "Enquire" },
];

/**
 * On the home page the nav sits over the hero photograph in chalk; everywhere
 * else it sits on the chalk ground in ink. Nothing else changes between the
 * two — same type, same gutter, same hover.
 *
 * The hover is the one in `reference-home.html` and the only one on the site:
 * the rule under a link draws itself from the left and the letter-spacing
 * opens very slightly. No colour changes on hover, here or anywhere.
 */
export default function Nav() {
  const pathname = usePathname();
  const overHero = pathname === claraPath();

  const tone = overHero ? "text-clara-chalk" : "text-clara-ink";
  const rule = overHero ? "bg-clara-chalk" : "bg-clara-ink";

  return (
    <header
      className={`${overHero ? "absolute inset-x-0 top-0 z-10" : "relative"} ${tone}`}
    >
      <nav
        aria-label="Primary"
        // Four links and the wordmark cannot share a line on a phone, so the
        // list wraps beneath it whole rather than breaking a label.
        className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-[var(--gutter)] py-3 md:py-4"
      >
        <Link
          href={claraPath()}
          className="font-clara-display text-[17px] font-medium tracking-[0.01em]"
        >
          Clara Ashdown
        </Link>

        <ul className="flex flex-wrap items-center gap-x-[20px] gap-y-1 md:gap-x-5">
          {links.map((link) => {
            const here = pathname === link.href;
            // A case study or an essay keeps its section's rule drawn, but
            // the label stays a link, because it is not the page you are on.
            const inSection = pathname.startsWith(`${link.href}/`);

            return (
              <li key={link.href}>
                {/*
                  The page you are already on is not a link: it renders as
                  text, out of the tab order, and keeps its rule drawn.
                */}
                {here ? (
                  <span
                    aria-current="page"
                    className="relative inline-block pb-1 text-[12.5px] tracking-[0.01em] md:text-clara-nav"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-px ${rule}`}
                    />
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    className="group relative inline-block pb-1 text-[12.5px] tracking-[0.01em] transition-[letter-spacing] duration-300 ease-out hover:tracking-[0.04em] md:text-clara-nav"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-[350ms] ease-out group-hover:scale-x-100 ${
                        inSection ? "scale-x-100" : "scale-x-0"
                      } ${rule}`}
                    />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
