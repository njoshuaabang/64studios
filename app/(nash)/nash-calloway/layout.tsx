import type { Metadata, Viewport } from "next";
import { NashBaseProvider } from "@/components/nash/NashBase";
import { NASH_BASE } from "@/lib/nash/paths";
import { nashBase } from "@/lib/nash/server";

/**
 * Nash's brand scope. The `nash` class is the hook every scoped rule in
 * globals.css hangs off — ground, selection and focus ring — so this brand and
 * the others can share one stylesheet without leaking into each other.
 */
export const metadata: Metadata = {
  title: {
    default: "Nash Calloway Design",
    template: "%s — Nash Calloway Design",
  },
  description:
    "Interior architecture and design in Los Angeles, London, and select international locations.",
  // A self-initiated concept, not a real business — kept out of the index but
  // still crawlable, so it still renders for anything that fetches it. Set
  // once here for the whole brand tree rather than page by page.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Nash Calloway Design",
    description: "Mid-century instinct. Wherever the house is.",
    url: NASH_BASE,
    siteName: "Nash Calloway Design",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F1E9DD",
};

export default async function NashLayout({ children }: { children: React.ReactNode }) {
  const base = await nashBase();

  return (
    <div className="nash min-h-[100dvh] bg-nash-plaster font-nash-body text-nash-ink antialiased">
      <NashBaseProvider value={base}>{children}</NashBaseProvider>
    </div>
  );
}
