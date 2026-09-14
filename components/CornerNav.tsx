"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";

const links = [
  { href: "/portfolio", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];


/**
 * True while the reader is moving down the page, false as soon as they turn
 * back. The header is chrome: it is worth its space when someone is looking
 * for it and not while they are reading past it.
 *
 * It never hides in the first 96px, where there is nothing to get out of the
 * way of. The threshold is there so a trackpad's jitter, or the rubber-band at
 * the end of a phone scroll, does not flicker it.
 *
 * This runs for everyone, including under prefers-reduced-motion. It used to
 * bail out on that setting, which meant a phone with Reduce Motion switched on
 * — an ordinary thing to have on — never got the behaviour at all. The setting
 * is honoured in the styles instead: reduced motion drops the slide and keeps
 * the fade, because a fade travels no distance and is not the kind of movement
 * that setting exists to stop.
 */
const HIDE_BELOW = 96;
const THRESHOLD = 8;

function useHideOnScrollDown() {
  const [hidden, setHidden] = useState(false);
  // A client-side navigation leaves the last page's scroll position behind.
  // Re-running the effect per route resets the baseline, so the first scroll
  // on the new page is measured from where that page actually starts.
  const pathname = usePathname();

  useEffect(() => {
    let previous = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const moved = y - previous;
      // Small moves accumulate rather than resetting the baseline, so a
      // trackpad's jitter and the rubber-band at the end of a phone scroll
      // do not flicker it.
      if (Math.abs(moved) < THRESHOLD) return;
      previous = y;
      setHidden(moved > 0 && y > HIDE_BELOW);
    };

    // The reading used to be deferred to the next animation frame and latched
    // behind the pending handle. That handle was the bug: a frame scheduled
    // and then dropped rather than run — which is what a phone does when it
    // locks, when the tab goes to the background, or when a page comes back
    // out of the back/forward cache — left the latch set for good, and the
    // listener never scheduled another read. The behaviour worked exactly
    // once per page load and then died until the next full reload.
    //
    // Reading window.scrollY straight out of a passive listener cannot get
    // stuck. It costs a cached property read per event, and React drops a
    // state update that does not change the value, so the re-render count is
    // the same as before.
    window.addEventListener("scroll", onScroll, { passive: true });

    // Coming back from a lock, an app switch or the back/forward cache, the
    // baseline is stale and the first delta would be meaningless. Both of
    // these resync it against where the page actually is.
    const resync = () => {
      previous = window.scrollY;
    };
    window.addEventListener("pageshow", resync);
    document.addEventListener("visibilitychange", resync);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", resync);
      document.removeEventListener("visibilitychange", resync);
    };
  }, [pathname]);

  return hidden;
}

export default function CornerNav() {
  const hidden = useHideOnScrollDown();

  return (
    /* The tracking is CSS, never literal spaces between letters: a screen
       reader must announce "Work", not "W O R K".

       It eases off below 640px. At 0.25em the three links ran to within a
       single pixel of the 64. mark on a 320px screen — touching it, with the
       hover state widening them further. The letter-spaced character is kept;
       only the amount gives way, and only where there is no room for it. */
    /* The header landmark lives here rather than on each page, because this
       is the one component every 64 Studios route renders its navigation
       through. Halden and Nash Calloway already wrap their own navs this way.
       The mark sits in the header beside the nav rather than inside it: it is
       a way home, not one of the three sections. */
    /* has-[:focus-visible] brings it straight back for a keyboard visitor:
       tabbing into something translated off screen would otherwise move focus
       somewhere invisible.

       Not focus-within, which was the bug. Tapping a nav link leaves focus on
       that link, inside this header, and focus-within then pinned the whole
       bar visible — on that page and on every page after it, because a
       client-side navigation does not move focus. It read as the behaviour
       working until you first used the nav and then never again.
       :focus-visible matches keyboard focus and not a tap, which is exactly
       the distinction wanted here. */
    <header
      data-corner-nav
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-3 py-1 transition-[transform,opacity] duration-300 ease-out has-[:focus-visible]:pointer-events-auto has-[:focus-visible]:translate-y-0 has-[:focus-visible]:opacity-100 motion-reduce:transition-[opacity] motion-reduce:duration-200 md:px-4 md:py-2 ${
        hidden
          ? "pointer-events-none -translate-y-full opacity-0 motion-reduce:translate-y-0"
          : "pointer-events-auto translate-y-0 opacity-100"
      }`}
    >
      <TransitionLink
        href="/"
        aria-label="64 Studios — Home"
        className="inline-block py-2 font-display text-sm font-bold text-ink"
      >
        64.
      </TransitionLink>
      <nav aria-label="Primary">
        {/* Four links need room three did not. Below 640px the size drops a
            point, the tracking eases to 0.06em and the gap to 6px — enough to
            clear the 64. mark at 320px, which is the narrowest screen this is
            measured at. The letter-spaced character is kept everywhere; only
            the amount gives way, and only where there is no room for it. */}
        <ul className="flex items-center gap-[6px] sm:gap-4 md:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <TransitionLink
                href={link.href}
                className="group grid py-2 font-body text-[12px] uppercase text-ink sm:text-[13px]"
              >
                {/* Invisible copy at hover tracking reserves the width, so one
                    link's hover never reflows its neighbours. */}
                <span aria-hidden="true" className="invisible col-start-1 row-start-1 tracking-[0.12em] sm:tracking-[0.35em]">
                  {link.label}
                </span>
                <span className="col-start-1 row-start-1 tracking-[0.06em] transition-[letter-spacing] duration-400 group-hover:tracking-[0.12em] sm:tracking-[0.25em] sm:group-hover:tracking-[0.35em]">
                  {link.label}
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
