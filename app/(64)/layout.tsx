import PageTransition from "@/components/PageTransition";
import CornerNav from "@/components/CornerNav";
import FooterSlot from "@/components/FooterSlot";
import { display, body } from "@/lib/fonts";
import JsonLd from "@/components/JsonLd";
import { social } from "@/config/social";
import { SITE_URL } from "@/lib/site";

/**
 * The studio block, on 64 Studios' own pages and nowhere else.
 *
 * It used to sit in the root layout, which put a web design studio's
 * structured data on every Halden and Nash Calloway page as well. That was
 * defensible while those were concept sites carrying a credit in the footer;
 * it stopped being defensible when Halden became a house for sale, and a
 * parser reading that page found both a ProfessionalService and a
 * SingleFamilyResidence and no way to tell which the page was about.
 *
 * The footer credit on those sites already says who built them, in prose,
 * which is the right place for it.
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
 * Chrome for 64 Studios' own pages, and 64's font variables — declared here
 * rather than in the root layout, so a Halden or Nash Calloway page doesn't
 * load them too.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} font-body`}>
      <JsonLd data={studioSchema} />
      <PageTransition>
        <CornerNav />
        {children}
        <FooterSlot />
      </PageTransition>
    </div>
  );
}
