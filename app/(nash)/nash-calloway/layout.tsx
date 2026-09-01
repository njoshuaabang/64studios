import type { Metadata, Viewport } from "next";
import { NASH_BASE } from "@/lib/nash/paths";

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

export default function NashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nash min-h-[100dvh] bg-nash-plaster font-nash-body text-nash-ink antialiased">
      {children}
    </div>
  );
}
