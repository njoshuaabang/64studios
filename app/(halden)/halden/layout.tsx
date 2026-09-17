import type { Metadata, Viewport } from "next";
import { HaldenBaseProvider } from "@/components/halden/HaldenBase";
import { HALDEN_BASE } from "@/lib/halden/paths";
import { haldenBase } from "@/lib/halden/server";
import { haldenDisplay, haldenBody } from "@/lib/halden/fonts";
import ResidenceSchema from "@/components/halden/ResidenceSchema";

/**
 * Halden's brand scope. The `halden` class is the hook every scoped rule in
 * globals.css hangs off — palette, gutters, selection and focus ring — so the
 * two brands can share one stylesheet without leaking into each other.
 */
export const metadata: Metadata = {
  title: {
    default: "Halden | Restored Georgian Townhouse for Sale, Marylebone W1",
    template: "%s — Halden",
  },
  description:
    "A Grade II listed 1794 townhouse in Marylebone, restored 2026. Six bedrooms, four reception rooms and a walled garden. Guide price £9,750,000, freehold.",
  // A self-initiated concept, not a real listing — kept out of the index and
  // its links unfollowed. Set once here for the whole brand tree rather than
  // page by page.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Halden",
    description: "A restored Georgian townhouse for sale in Marylebone, London W1.",
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
      <ResidenceSchema />
      <HaldenBaseProvider value={base}>{children}</HaldenBaseProvider>
    </div>
  );
}
