import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/halden/Reveal";
import { asset, haldenPath } from "@/lib/halden/paths";
import { haldenBase } from "@/lib/halden/server";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Membership of Halden is by proposal. A member puts a name forward, the committee considers it, and in time a letter arrives.",
};

const paragraphs = [
  "Membership is by proposal. A member puts a name forward, the committee considers it, and in time a letter arrives.",
  "The house is small and intends to stay that way. Numbers are limited to what the rooms can hold on an ordinary Thursday.",
  "There is a joining fee and an annual subscription. Both are set out in the letter.",
  "Members may bring two guests. The guests are the member’s responsibility, which is usually enough.",
];

export default async function MembershipPage() {
  const base = await haldenBase();

  return (
    <main className="w-full px-[var(--gutter)] pt-8 text-center md:pt-10">
      <Reveal>
        <h1 className="font-halden-display text-halden-display font-light">Membership.</h1>
      </Reveal>

      {/* Centred column: the measure stays readable, the block sits mid-page. */}
      <div className="mx-auto max-w-halden-prose pt-3 md:pt-4">
        {paragraphs.map((text) => (
          // The spacing sits on the wrapper, not the paragraph: each paragraph
          // is an only child, so `last:` would match every one of them.
          <Reveal key={text} className="pb-3 last:pb-0">
            {/* The house note treatment: a step down from base, and ink held off
                full strength so a centred column does not read as a slab. */}
            <p className="text-halden-note leading-[1.4] text-halden-ink/80">
              {text}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Lifted so the stair is already in frame when the page opens. */}
      <Reveal className="pt-8 md:pt-10">
        <div className="relative h-[80vh] w-full overflow-hidden">
          <Image
            src={asset("/images/stair-above.jpg")}
            alt="The staircase seen from above, winding down past its mahogany handrail to the chequered floor of the hall below."
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
          Enquire
        </Link>
      </Reveal>
    </main>
  );
}
