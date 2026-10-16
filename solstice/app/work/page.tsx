import type { Metadata } from "next";
import Image from "next/image";
import { HoldingPage } from "@/components/layout/HoldingPage";
import { caseStudy, holding } from "@/lib/content";
import { photo } from "@/lib/photos";

export const metadata: Metadata = { title: holding.work.title };

export default function WorkPage() {
  const photos = [photo("newbury-rear"), photo("newbury-frame")].filter((p) => p.exists);
  return (
    <HoldingPage title={holding.work.title}>
      <p>{holding.work.body}</p>
      <section id="newbury" aria-labelledby="newbury-title" className="scroll-mt-8 pt-10">
        <h2 id="newbury-title" className="font-display text-figure">
          {caseStudy.label}
        </h2>
        <p className="mt-4">{caseStudy.caption}</p>
        {photos.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {photos.map((p) => (
              <div key={p.slot} className="relative aspect-[3/4] overflow-hidden bg-concrete">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </section>
    </HoldingPage>
  );
}
