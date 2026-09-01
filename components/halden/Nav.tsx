"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import { useReducedMotion } from "@/lib/halden/useReducedMotion";
import { haldenPath } from "@/lib/halden/paths";

const navItem = "whitespace-nowrap py-1 text-halden-nano uppercase tracking-halden-nav";

const links = [
  { href: haldenPath("/the-house"), label: "The House" },
  { href: haldenPath("/membership"), label: "Membership" },
  { href: haldenPath("/enquire"), label: "Enquire" },
];

/**
 * On the long image sequence the nav stays out of the way until the reader has
 * committed to scrolling. Everywhere else it is present from the start, because
 * on a short page there may be no scroll to wait for.
 */
export default function Nav() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const revealOnScroll = pathname === haldenPath("/the-house");

  const [scrolled, setScrolled] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);

  // The nav lives in the layout and survives navigation, so arriving at the
  // sequence from another page has to put it back to hidden.
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setScrolled(false);
  }

  useEffect(() => {
    if (!revealOnScroll || reducedMotion) return;

    // Once revealed it stays revealed; scrolling back to the top of the
    // sequence should not take the way out with it.
    const onScroll = () => {
      if (window.scrollY > 24) setScrolled(true);
    };

    // Covers a reload part-way down the page, where the browser restores the
    // scroll position without firing an event we are listening for.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [revealOnScroll, reducedMotion]);

  const shown = !revealOnScroll || reducedMotion || scrolled;

  return (
    <header
      // `focus-within` keeps a keyboard reader off an invisible target: tabbing
      // into the faded nav brings it up, without waiting on a state round trip.
      className={`sticky top-0 z-50 border-b border-halden-brass/70 bg-halden-limewash/90 backdrop-blur-[2px] transition-opacity duration-300 ease-out focus-within:opacity-100 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <nav
        aria-label="Primary"
        // Below roughly 480px the wordmark and the three links cannot share a
        // line without breaking a label, so the list wraps beneath it whole.
        className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-1 px-[var(--gutter)] py-1"
      >
        <Link
          href={haldenPath()}
          aria-label="Halden — back to the threshold"
          className="py-1 text-halden-ink transition-colors duration-300 hover:text-halden-brass"
        >
          <Wordmark />
        </Link>

        <ul className="flex items-center gap-2 md:gap-3">
          {links.map((link, i) => {
            const current = pathname === link.href;

            return (
              <li key={link.href} className="flex items-center gap-2 md:gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-halden-nano text-halden-brass">
                    ·
                  </span>
                )}
                {/*
                  The page you are already on is not a link: it renders as text,
                  out of the tab order, and carries no colour of its own.
                */}
                {current ? (
                  <span
                    aria-current="page"
                    className={`${navItem} text-halden-ink`}
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    className={`${navItem} text-halden-ink transition-colors duration-300 hover:text-halden-brass`}
                  >
                    {link.label}
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
