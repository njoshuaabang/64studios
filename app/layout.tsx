import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Shell only — no chrome, no fonts. 64 Studios gets its nav, page transition
 * and its two font variables from app/(64)/layout.tsx, Halden its own from
 * app/(halden)/halden/layout.tsx, Nash Calloway hers from
 * app/(nash)/nash-calloway/layout.tsx, and the one route outside all three
 * groups — app/not-found.tsx — declares its own. Nothing here needs a font,
 * so nothing here loads one; each brand's fonts now load only on that
 * brand's own pages.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "64 Studios — Websites for the people behind fine homes",
    // Routes that set a bare title get the suffix; routes that set their own
    // full title (Selected Work, The Studio, Contact) pass it through absolute.
    template: "%s — 64 Studios",
  },
  description:
    "Custom websites for interior designers, architects, builders and makers. Drawn from scratch and built by hand in Sheffield.",
  openGraph: {
    title: "64 Studios — Websites for the people behind fine homes",
    description:
      "Custom websites for interior designers, architects, builders and makers. Drawn from scratch and built by hand in Sheffield.",
    url: SITE_URL,
    siteName: "64 Studios",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Nash's entrance gate sets a data attribute on <html> before paint, which
    // React would otherwise report as a hydration mismatch on this element.
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-ink antialiased">
        {/*
          The one link every page needs before its own nav: jumps a keyboard
          or screen-reader visitor straight past whichever brand's nav sits
          ahead of it to that page's own <main id="main-content">. Renders
          before any brand's layout, so it cannot assume a brand's own font —
          it uses the browser default, which is fine for something normally
          invisible.
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:bg-background focus:px-2 focus:py-1 focus:text-sm focus:text-ink focus:outline focus:outline-1 focus:outline-ink"
        >
          Skip to content
        </a>
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
          Vercel Analytics and Speed Insights. They render nothing and are
          inert off Vercel, so they cost local development and any other host
          precisely nothing. They sit after {children} so they can never delay
          the page's own content.
        */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
