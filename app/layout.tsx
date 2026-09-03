import type { Metadata } from "next";
import { display, body } from "@/lib/fonts";
import { haldenDisplay, haldenBody } from "@/lib/halden/fonts";
import { nashDisplay, nashBody } from "@/lib/nash/fonts";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

/**
 * Shell only. Every brand's font variables are declared here because
 * `next/font` has to be loaded at the top of the tree, but no chrome is: 64
 * Studios gets its nav and page transition from app/(64)/layout.tsx, Halden
 * its own from app/(halden)/halden/layout.tsx, and Nash Calloway hers from
 * app/(nash)/nash-calloway/layout.tsx.
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
    // Nash's entrance gate sets a data attribute on <html> before paint, which
    // React would otherwise report as a hydration mismatch on this element.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${haldenDisplay.variable} ${haldenBody.variable} ${nashDisplay.variable} ${nashBody.variable}`}
    >
      <body className="bg-background font-body text-ink antialiased">
        {/*
          Runs as the parser reaches it — before the entrance markup below is
          parsed and before first paint — so the panels are either present from
          the first frame or never rendered, with no flash either way. It is a
          raw inline script rather than next/script because `beforeInteractive`
          inside <body> is queued to run after hydration begins, which is far
          too late for a gate that has to beat paint. It no-ops on every route
          but Nash's home page, and deliberately keeps no session flag — the
          sequence replays on every load of that page.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
if (location.pathname !== '/nash-calloway') return;
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
document.documentElement.setAttribute('data-ncd-entrance','play');
}catch(e){}})();`,
          }}
        />
        {children}

        {/*
          Vercel Analytics. It renders nothing and is inert off Vercel, so it
          costs local development and any other host precisely nothing. It sits
          after {children} so it can never delay the page's own content.
        */}
        <Analytics />
      </body>
    </html>
  );
}
