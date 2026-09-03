import type { Metadata } from "next";
import StudioSections from "@/components/StudioSections";

export const metadata: Metadata = {
  // Absolute, so the "%s — 64 Studios" template does not append a second time.
  title: { absolute: "The Studio — 64 Studios" },
  description:
    "A branding agency that works slowly and by hand. Every website drawn from scratch — no templates, no page builders.",
  openGraph: {
    title: "The Studio — 64 Studios",
    description:
      "A branding agency that works slowly and by hand. Every website drawn from scratch — no templates, no page builders.",
  },
};

export default function StudioPage() {
  return <StudioSections />;
}
