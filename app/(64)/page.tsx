import type { Metadata } from "next";
import HomeHero from "@/components/HomeHero";

export const metadata: Metadata = {
  // Absolute, so the "%s — 64 Studios" template does not append a second time.
  title: { absolute: "64 Studios — Websites for the people behind fine homes" },
  description:
    "Custom websites for interior designers, architects, builders and makers. Drawn from scratch and built by hand in Sheffield.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "64 Studios — Websites for the people behind fine homes",
    description:
      "Custom websites for interior designers, architects, builders and makers. Drawn from scratch and built by hand in Sheffield.",
  },
};

export default function Home() {
  return <HomeHero />;
}
