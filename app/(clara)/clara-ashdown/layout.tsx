import type { Metadata, Viewport } from "next";
import Nav from "@/components/clara/Nav";
import Colophon from "@/components/clara/Colophon";
import { CLARA_BASE } from "@/lib/clara/paths";

/**
 * Clara's brand scope. The `clara` class is the hook every scoped rule in
 * globals.css hangs off — palette, gutter, drop cap, selection and focus
 * ring — so the three brands can share one stylesheet without leaking into
 * each other.
 *
 * The colophon is here rather than on each page, because it closes every
 * page on this site and there is no other footer.
 */
export const metadata: Metadata = {
  title: {
    default: "Clara Ashdown — Interior design, Gloucestershire",
    template: "%s — Clara Ashdown",
  },
  description:
    "I work on stone farmhouses and converted barns across Gloucestershire and Oxfordshire. A small number of projects a year, each seen through from the first walk-through to the last coat of limewash.",
  openGraph: {
    title: "Clara Ashdown",
    description: "Interior design, Gloucestershire.",
    url: CLARA_BASE,
    siteName: "Clara Ashdown Design",
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F0E8",
};

export default function ClaraLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      lang="en-GB"
      className="clara flex min-h-[100dvh] flex-col bg-clara-chalk font-clara-body text-clara-base text-clara-ink antialiased"
    >
      <Nav />
      <main className="flex-1">{children}</main>
      <Colophon />
    </div>
  );
}
