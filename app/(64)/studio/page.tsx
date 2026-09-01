import type { Metadata } from "next";
import StudioSections from "@/components/StudioSections";

export const metadata: Metadata = {
  title: "Studio",
};

export default function StudioPage() {
  return <StudioSections />;
}
