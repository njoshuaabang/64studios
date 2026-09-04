import type { Metadata } from "next";
import { display, body } from "@/lib/fonts";
import { haldenDisplay, haldenBody } from "@/lib/halden/fonts";
import { nashDisplay, nashBody } from "@/lib/nash/fonts";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/JsonLd";
import { social } from "@/components/SiteFooter";

/**
 * The one Organization block for the whole site — every page inherits it
 * from here rather than each brand declaring its own copy. Demo-brand pages
 * carry it too: they already disclose "a self-initiated concept by 64
 * Studios" in their own footer, so the same attribution in structured data
 * is consistent with that, not a second signal invented for this.
 *
 * `sameAs` is read from the footer's own list rather than typed out a second
 * time, so the two cannot drift.
 *
 * Two facts here are not yet stated as prose anywhere, but both are already
 * live and real rather than invented: "Sheffield" is in the /studio title
 * tag (Phase 2.4), and the founder's name is the slug of the LinkedIn URL
 * already in the footer today (.../in/nkere-abang-.../). Everything else —
 * a founding date, a phone number, an employee count, a price range, a
 * rating — has no such backing anywhere on the site and is left out.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "64 Studios",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: "studio@64studios.design",
  founder: {
    "@type": "Person",
    name: "Nkere Abang",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sheffield",
    addressCountry: "GB",
  },
  areaServed: ["GB", "Worldwide"],
  knowsAbout: ["brand identity", "web design", "art direction", "front-end development"],
  sameAs: social.map((item) => item.href),
  // The exact sentence already on /studio's mission paragraph, not a new line
  // written for this field.
  slogan: "Most good businesses are undersold by their websites.",
};

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
    default: "64 Studios — Branding Agency & Website Design",
    // Routes that set a bare title get the suffix; routes that set their own
    // full title (Selected Work, The Studio, Contact) pass it through absolute.
    template: "%s — 64 Studios",
  },
  description:
    "64 Studios is a branding agency designing brand identities and building high-end custom websites for hotels, makers, practices and founders.",
  openGraph: {
    title: "64 Studios — Branding Agency & Website Design",
    description:
      "64 Studios is a branding agency designing brand identities and building high-end custom websites for hotels, makers, practices and founders.",
    url: SITE_URL,
    siteName: "64 Studios",
    type: "website",
    images: [{ url: "/icon.svg", alt: "64 Studios" }],
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${haldenDisplay.variable} ${haldenBody.variable} ${nashDisplay.variable} ${nashBody.variable}`}
    >
      <body className="bg-background font-body text-ink antialiased">
        <JsonLd data={organizationSchema} />
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
