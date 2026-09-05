import type { Metadata } from "next";
import StudioSections from "@/components/StudioSections";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "64 Studios", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "The Studio", item: `${SITE_URL}/studio` },
  ],
};

export const metadata: Metadata = {
  // Absolute, so the "%s — 64 Studios" template does not append a second time.
  // 64 characters — 4 over the "under 60 where possible" guideline, kept
  // because it is the exact string specified for this route.
  title: { absolute: "About 64 Studios — Brand Identity & Web Design Studio, Sheffield" },
  description:
    "One project at a time, one to two weeks from first conversation to launch. Brand identity and websites drawn from scratch and built by hand — no templates, no page builders.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "About 64 Studios — Brand Identity & Web Design Studio, Sheffield",
    description:
      "One project at a time, one to two weeks from first conversation to launch. Brand identity and websites drawn from scratch and built by hand — no templates, no page builders.",
  },
};

export default function StudioPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <StudioSections />
    </>
  );
}
