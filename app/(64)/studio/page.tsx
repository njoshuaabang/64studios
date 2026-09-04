import type { Metadata } from "next";
import StudioSections from "@/components/StudioSections";

export const metadata: Metadata = {
  // Absolute, so the "%s — 64 Studios" template does not append a second time.
  // 64 characters — 4 over the "under 60 where possible" guideline, kept
  // because it is the exact string specified for this route.
  title: { absolute: "About 64 Studios — Brand Identity & Web Design Studio, Sheffield" },
  description:
    "A branding agency that works slowly and by hand. Every website drawn from scratch — no templates, no page builders.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "About 64 Studios — Brand Identity & Web Design Studio, Sheffield",
    description:
      "A branding agency that works slowly and by hand. Every website drawn from scratch — no templates, no page builders.",
  },
};

export default function StudioPage() {
  return <StudioSections />;
}
