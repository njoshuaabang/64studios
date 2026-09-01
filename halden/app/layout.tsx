import type { Metadata, Viewport } from "next";
import { body, display } from "@/lib/fonts";
import { asset, basePath } from "@/lib/basePath";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Fallback only: every page sets its own title through `pageMetadata`.
  title: "Halden | Private Members’ Club in Marylebone, London",
  description:
    "A private members’ club in a Georgian townhouse in Marylebone, London. Bar, private dining, library, garden and six bedrooms, for a small membership.",
  // Self-initiated concept: it must not compete in search with real Marylebone
  // clubs. Do not remove without asking.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F2EFE9",
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  additionalType: "https://en.wikipedia.org/wiki/Gentlemen%27s_club",
  name: "Halden",
  description:
    "A private members’ club in a restored 1794 Georgian townhouse in Marylebone, London.",
  url: `${SITE_URL}${basePath}`,
  image: `${SITE_URL}${asset("/images/threshold.jpg")}`,
  email: "enquiries@halden.london",
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 Marylebone",
    addressLocality: "London",
    postalCode: "W1",
    addressCountry: "United Kingdom",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body className="bg-limewash font-body text-base text-ink antialiased">
        <script
          type="application/ld+json"
          // Serialised from an object literal defined above, so there is no
          // untrusted input to escape here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        {children}
      </body>
    </html>
  );
}
