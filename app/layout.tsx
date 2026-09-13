import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/JsonLd";
import { social } from "@/config/social";

/**
 * The one studio block for the whole site — every page inherits it from here
 * rather than each brand declaring its own copy. Demo-brand pages carry it
 * too: they already disclose "a self-initiated concept by 64 Studios" in
 * their own footer, so the same attribution in structured data is consistent
 * with that, not a second signal invented for this.
 *
 * `sameAs` is read from config/social.ts, the same list the footer renders
 * and the outbound-click tracking reads, so none of the three can drift.
 *
 * The offer catalogue is the one place outside /process that carries the
 * prices. When the website price rises to £5,000 it changes here, on that
 * page, in that page's meta description, and in llms.txt — four places, and
 * nothing else holds the number.
 */
const studioSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  // The stable identifier other blocks point at — the Person on /studio uses
  // it for worksFor — so the founder and the business are one linked entity
  // rather than two names that happen to match.
  "@id": `${SITE_URL}/#studio`,
  name: "64 Studios",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  slogan: "Websites for the people behind fine homes.",
  description: "Web design studio for interior designers, architects, builders and makers.",
  email: "studio@64studios.design",
  founder: { "@type": "Person", name: "Nkere Abang" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sheffield",
    addressCountry: "GB",
  },
  areaServed: "GB",
  priceRange: "£3,000–£7,000",
  knowsAbout: [
    "Web design for interior designers",
    "Web design for architects",
    "Websites for builders",
    "Next.js",
  ],
  sameAs: social.map((item) => item.href),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Websites, and what they cost",
    itemListElement: [
      {
        "@type": "Offer",
        name: "The Website Week",
        price: "7000",
        priceCurrency: "GBP",
        url: `${SITE_URL}/process#fees`,
        itemOffered: {
          "@type": "Service",
          name: "The Website Week",
          description:
            "A website of up to ten pages, designed and built in one fixed week, Monday to Friday, with an editor for adding projects.",
        },
      },
      {
        "@type": "Offer",
        name: "A website",
        price: "3000",
        priceCurrency: "GBP",
        url: `${SITE_URL}/process#fees`,
        itemOffered: {
          "@type": "Service",
          name: "A website",
          description:
            "A website of up to six pages, about three weeks from content to launch.",
        },
      },
      {
        "@type": "Offer",
        name: "Care",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "200",
          priceCurrency: "GBP",
          unitCode: "MON",
        },
        url: `${SITE_URL}/process#fees`,
        itemOffered: {
          "@type": "Service",
          name: "Care",
          description:
            "Hosting, updates, backups and up to two new projects added each month.",
        },
      },
    ],
  },
};
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
        <JsonLd data={studioSchema} />
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
