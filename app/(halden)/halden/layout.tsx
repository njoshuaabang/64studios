import type { Metadata, Viewport } from "next";
import { HaldenBaseProvider } from "@/components/halden/HaldenBase";
import { HALDEN_BASE } from "@/lib/halden/paths";
import { haldenBase } from "@/lib/halden/server";
import { haldenDisplay, haldenBody } from "@/lib/halden/fonts";

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
  // A self-initiated concept, not a real business — kept out of the index but
  // still crawlable, so it still renders for anything that fetches it. Set
  // once here for the whole brand tree rather than page by page.
  robots: { index: false, follow: true },
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

export default async function HaldenLayout({ children }: { children: React.ReactNode }) {
  const base = await haldenBase();

  return (
    <div
      lang="en-GB"
      className={`halden min-h-[100dvh] bg-halden-limewash font-halden-body text-halden-base text-halden-ink antialiased ${haldenDisplay.variable} ${haldenBody.variable}`}
    >
      <HaldenBaseProvider value={base}>{children}</HaldenBaseProvider>
    </div>
  );
}
