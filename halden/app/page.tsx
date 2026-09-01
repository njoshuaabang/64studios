import Threshold from "@/components/Threshold";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Halden | Private Members’ Club in Marylebone, London",
  description:
    "A private members’ club in a Georgian townhouse in Marylebone, London. Bar, private dining, library, garden and six bedrooms, for a small membership.",
});

export default function ThresholdPage() {
  return <Threshold />;
}
