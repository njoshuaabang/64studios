"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";

/**
 * The full footer on every 64 Studios page except the homepage, which is a
 * single non-scrollable viewport and cannot carry one without either forcing
 * a scroll or crowding the composition.
 *
 * The homepage gets a minimal one instead: the address, and nothing else. A
 * visitor who does not recognise the single link otherwise has no way to
 * reach the studio at all. It is positioned against the viewport rather than
 * in flow, so it costs the threshold no height, and it sits bottom-right to
 * balance the intro paragraph at bottom-left.
 *
 * A client component because the decision is made from the path, and the
 * layout above it stays a server component either way.
 */
export default function FooterSlot() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <footer className="pointer-events-none fixed inset-x-0 bottom-6 z-30 px-4 text-center md:px-6 md:text-right">
        <a
          href="mailto:studio@64studios.design"
          className="pointer-events-auto inline-block py-2 font-body text-[13px] text-ink underline decoration-ink/35 underline-offset-4 transition-colors duration-200 hover:decoration-ink focus-visible:decoration-ink motion-reduce:transition-none"
        >
          studio@64studios.design
        </a>
      </footer>
    );
  }

  return <SiteFooter />;
}
