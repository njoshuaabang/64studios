import type { Metadata } from "next";
import StudioSections from "@/components/StudioSections";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { social } from "@/config/social";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "64 Studios", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Studio", item: `${SITE_URL}/studio` },
  ],
};

/**
 * The founder as an entity in his own right, linked to the business rather
 * than left as a name that happens to appear in two places. This page is
 * where he is written about, so this is where the block goes.
 *
 * `sameAs` reads the LinkedIn href out of config/social.ts, the same list the
 * footer renders, so the two cannot drift. Everything asserted here is
 * already stated elsewhere on the site: the name and the role in the
 * Organization block, the city in this page's own title.
 */
const founder = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nkere Abang",
  jobTitle: "Founder",
  worksFor: { "@id": `${SITE_URL}/#studio` },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sheffield",
    addressCountry: "GB",
  },
  knowsAbout: ["Web design for interior designers", "Web design for architects", "Websites for builders", "Next.js"],
  sameAs: social.filter((item) => item.label === "LinkedIn").map((item) => item.href),
};

export const metadata: Metadata = {
  // Absolute, so the "%s — 64 Studios" template does not append a second time.
  title: { absolute: "About 64 Studios — a web studio in Sheffield" },
  description:
    "64 Studios designs and builds websites for interior designers, architects, builders and makers. Founded by Nkere Abang in Sheffield.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "About 64 Studios — a web studio in Sheffield",
    description:
      "64 Studios designs and builds websites for interior designers, architects, builders and makers. Founded by Nkere Abang in Sheffield.",
  },
};

export default function StudioPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={founder} />
      <StudioSections />
    </>
  );
}
