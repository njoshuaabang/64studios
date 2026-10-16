import Image from "next/image";
import type { PhotoSlot } from "@/lib/photos";
import { caseStudy, hero, steps, trust } from "@/lib/content";
import { Button } from "../ui/Button";
import { CredentialsLine } from "../trust/CredentialsLine";
import { Figures } from "../trust/Figures";
import { EstimateButton } from "./EstimateButton";

function FramedPhoto({ photo, className, sizes }: { photo: PhotoSlot; className: string; sizes: string }) {
  return (
    <div className={`absolute ${className}`}>
      {/* Thin offset frame, 12px down and right; its four lines draw in (ScrollMotion). */}
      <div data-frame aria-hidden className="absolute inset-0 translate-x-3 translate-y-3">
        <span className="absolute inset-x-0 top-0 h-px origin-left bg-concrete" />
        <span className="absolute inset-y-0 right-0 w-px origin-top bg-concrete" />
        <span className="absolute inset-x-0 bottom-0 h-px origin-right bg-concrete" />
        <span className="absolute inset-y-0 left-0 w-px origin-bottom bg-concrete" />
      </div>
      <div className="absolute inset-0 overflow-hidden bg-concrete">
        {photo.exists ? (
          <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: photo.position }} />
        ) : (
          <div role="img" aria-label={photo.alt} className="flex h-full items-center justify-center p-4 text-center text-small text-ink">
            {photo.missingLabel}
          </div>
        )}
      </div>
    </div>
  );
}

/** Site B's one trust section, on Limestone. */
export function TrustSection({ newbury }: { newbury: { rear: PhotoSlot; frame: PhotoSlot } }) {
  return (
    <section data-trust-section aria-labelledby="trust-title" className="relative bg-limestone text-ink">
      <div className="shell flex flex-col justify-center py-(--section-pad) lg:min-h-[125svh]">
        {/* A third 1fr row takes the pair's extra height, so the figures sit right under the body. */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12 md:grid-rows-[auto_auto_1fr]">
          <div data-trust className="md:col-span-5 md:row-start-1">
            <p className="text-label text-slate uppercase">{trust.eyebrow}</p>
            <h2 id="trust-title" className="mt-4 font-display text-section">
              {trust.heading}
            </h2>
            <p className="mt-6 max-w-[30rem] text-body">{trust.body}</p>
          </div>

          <div data-trust className="md:col-span-6 md:col-start-7 md:row-span-3 md:row-start-1">
            {/* Back image top-right; the front overlaps its bottom-left corner. */}
            <div data-pair className="relative aspect-[15/16] w-full">
              <FramedPhoto photo={newbury.frame} className="top-0 right-3 aspect-square w-[66%]" sizes="(min-width: 768px) 30vw, 60vw" />
              <FramedPhoto photo={newbury.rear} className="bottom-3 left-0 aspect-[3/4] w-[44%]" sizes="(min-width: 768px) 22vw, 45vw" />
            </div>
            <p className="mt-10 text-label text-slate uppercase">{caseStudy.label}</p>
            <p className="mt-3 max-w-[26rem] text-body">{caseStudy.caption}</p>
          </div>

          <div data-trust className="md:col-span-5 md:row-start-2">
            <Figures layout="full" countOn="view" className="[&_dt]:text-slate" />
            <CredentialsLine className="mt-8 text-slate" />
          </div>
        </div>

        <ol data-trust className="mt-16 grid grid-cols-1 border-y border-concrete md:mt-24 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="border-concrete py-6 not-last:border-b md:px-6 md:not-last:border-r md:not-last:border-b-0 md:first:pl-0">
              <span className="text-label text-slate">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-body font-medium">{s.title}</h3>
              <p className="mt-1 text-body text-slate">{s.body}</p>
            </li>
          ))}
        </ol>

        <div data-trust className="mt-10 flex flex-col gap-3 sm:flex-row">
          <EstimateButton tone="light">{hero.primary.label}</EstimateButton>
          <Button href={hero.ghost.href} variant="ghost" tone="light" className="w-full sm:w-auto">
            {hero.ghost.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
