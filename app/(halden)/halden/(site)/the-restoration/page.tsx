import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/halden/Reveal";
import { asset, haldenPath } from "@/lib/halden/paths";
import { restoration, meta } from "@/lib/halden/copy";
import { haldenBase } from "@/lib/halden/server";

export const metadata: Metadata = {
  // Absolute: the metadata table sets the whole string, so the
  // "%s — Halden" template must not append to it.
  title: { absolute: meta.restoration.title },
  description: meta.restoration.description,
};

export default async function TheRestorationPage() {
  const base = await haldenBase();

  return (
    <main id="main-content" tabIndex={-1} className="w-full px-[var(--gutter)] pt-8 text-center md:pt-10">
      <Reveal>
        <h1 className="font-halden-display text-halden-display font-light">{restoration.title}</h1>
      </Reveal>

      <div className="mx-auto max-w-halden-prose pt-3 md:pt-4">
        {restoration.paragraphs.map((text) => (
          // The spacing sits on the wrapper, not the paragraph: each paragraph
          // is an only child, so `last:` would match every one of them.
          <Reveal key={text.slice(0, 40)} className="pb-3 last:pb-0">
            <p className="text-halden-note leading-[1.4] text-halden-ink/80">{text}</p>
          </Reveal>
        ))}
      </div>

      {/* The two detail shots as a pair, at their own 3:4 ratio so neither is
          cropped, then the stair full width beneath them. */}
      <div className="mx-auto grid max-w-halden-content gap-6 pt-8 md:grid-cols-2 md:pt-10">
        {restoration.details.map((image) => (
          <Reveal key={image.src}>
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={asset(image.src)}
                alt={image.alt}
                fill
                quality={82}
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="pt-8 md:pt-10">
        <div className="relative h-[80vh] w-full overflow-hidden">
          <Image
            src={asset(restoration.stair.src)}
            alt={restoration.stair.alt}
            fill
            quality={82}
            sizes="(max-width: 1280px) 100vw, 1056px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal className="pt-10">
        <Link
          href={haldenPath(base, "/enquire")}
          className="inline-block text-halden-brass underline-offset-4 transition-colors duration-300 hover:underline"
        >
          {restoration.link}
        </Link>
      </Reveal>
    </main>
  );
}
