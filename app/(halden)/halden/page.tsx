import type { Metadata } from "next";
import Threshold from "@/components/halden/Threshold";

/**
 * `absolute` so the root layout's "%s — 64 Studios" template does not append
 * itself to Halden's own title. Child pages are fine: they pick up the
 * "%s — Halden" template from the nearest layout instead.
 */
export const metadata: Metadata = {
  title: { absolute: "Halden — A private house in Marylebone" },
};

export default function ThresholdPage() {
  return <Threshold />;
}
