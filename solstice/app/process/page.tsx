import type { Metadata } from "next";
import { HoldingPage } from "@/components/layout/HoldingPage";
import { holding, steps } from "@/lib/content";

export const metadata: Metadata = { title: holding.process.title };

export default function ProcessPage() {
  return (
    <HoldingPage title={holding.process.title}>
      <ol className="list-decimal space-y-3 pl-6 marker:text-concrete">
        {steps.map((s) => (
          <li key={s.title}>
            <strong className="font-medium">{s.title}</strong> {s.body}
          </li>
        ))}
      </ol>
    </HoldingPage>
  );
}
