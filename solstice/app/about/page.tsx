import type { Metadata } from "next";
import { HoldingPage } from "@/components/layout/HoldingPage";
import { holding, trustBody } from "@/lib/content";

export const metadata: Metadata = { title: holding.about.title };

export default function AboutPage() {
  return (
    <HoldingPage title={holding.about.title}>
      <p>{trustBody}</p>
    </HoldingPage>
  );
}
