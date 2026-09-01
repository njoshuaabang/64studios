import type { Metadata, Viewport } from "next";
import { HALDEN_BASE } from "@/lib/halden/paths";

/**
 * Halden's brand scope. The `halden` class is the hook every scoped rule in
 * globals.css hangs off — palette, gutters, selection and focus ring — so the
 * two brands can share one stylesheet without leaking into each other.
 */
export const metadata: Metadata = {
  title: {
    default: "Halden — A private house in Marylebone",
    template: "%s — Halden",
  },
  description:
    "A private members' house in a Georgian townhouse on a Marylebone street. Built in 1794, and a house again.",
  openGraph: {
    title: "Halden",
    description: "A private house in Marylebone.",
    url: HALDEN_BASE,
    siteName: "Halden",
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F2EFE9",
};

export default function HaldenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      lang="en-GB"
      className="halden min-h-[100dvh] bg-halden-limewash font-halden-body text-halden-base text-halden-ink antialiased"
    >
      {children}
    </div>
  );
}
