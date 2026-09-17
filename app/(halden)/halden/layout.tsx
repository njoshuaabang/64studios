import type { Metadata, Viewport } from "next";
import { HaldenBaseProvider } from "@/components/halden/HaldenBase";
import { HALDEN_BASE } from "@/lib/halden/paths";
import { haldenBase } from "@/lib/halden/server";
import { meta } from "@/lib/halden/copy";
import { haldenDisplay, haldenBody } from "@/lib/halden/fonts";
import ResidenceSchema from "@/components/halden/ResidenceSchema";

/**
 * Halden's brand scope. The `halden` class is the hook every scoped rule in
 * globals.css hangs off — palette, gutters, selection and focus ring — so the
 * two brands can share one stylesheet without leaking into each other.
 */
export const metadata: Metadata = {
  title: {
    default: meta.site.title,
    template: "%s — Halden",
  },
  description: meta.site.description,
  // A self-initiated concept, not a real listing — kept out of the index and
  // its links unfollowed. Set once here for the whole brand tree rather than
  // page by page.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Halden",
    description: meta.site.ogDescription,
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
