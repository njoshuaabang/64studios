import type { Metadata } from "next";
import { display, body } from "@/lib/fonts";
import { haldenDisplay, haldenBody } from "@/lib/halden/fonts";
import { claraDisplay, claraBody } from "@/lib/clara/fonts";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

/**
 * Shell only. Every brand's font variables are declared here because
 * `next/font` has to be loaded at the top of the tree, but no chrome is: 64
 * Studios gets its nav and page transition from app/(64)/layout.tsx, Halden
 * its own from app/(halden)/halden/layout.tsx, and Clara Ashdown hers from
 * app/(clara)/clara-ashdown/layout.tsx.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "64 Studios — Luxury Branding for Interior Designers",
    template: "%s — 64 Studios",
  },
  description:
    "64 Studios is a one-person luxury branding studio for interior designers. Six projects a year.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${haldenDisplay.variable} ${haldenBody.variable} ${claraDisplay.variable} ${claraBody.variable}`}
    >
      <body className="bg-background font-body text-ink antialiased">{children}</body>
    </html>
  );
}
