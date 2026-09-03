"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";

/**
 * Renders the footer on every 64 Studios page except the homepage, which is a
 * single non-scrollable viewport with nothing beneath it.
 *
 * A client component because the decision is made from the path, and the
 * layout above it stays a server component either way.
 */
export default function FooterSlot() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <SiteFooter />;
}
