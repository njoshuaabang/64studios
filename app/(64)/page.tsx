import type { Metadata } from "next";
import HomeHero from "@/components/HomeHero";

// Title, description and OG all inherit from the root layout — the homepage
// carries no override of its own, only the canonical it was missing.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeHero />;
}
