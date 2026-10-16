import type { Metadata } from "next";
import { HoldingPage } from "@/components/layout/HoldingPage";
import { holding, site } from "@/lib/content";

const { title, intro, status } = holding.estimate;
export const metadata: Metadata = { title };

export default function EstimatePage() {
  return (
    <HoldingPage title={title}>
      <p>
        {intro} {status[0]}
        <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-link whitespace-nowrap">
          {site.phone}
        </a>
        {status[1]}
        <a href={`mailto:${site.email}`} className="text-link break-all">
          {site.email}
        </a>
        {status[2]}
      </p>
    </HoldingPage>
  );
}
