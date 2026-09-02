import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import EnquireForm from "@/components/halden/EnquireForm";
import Reveal from "@/components/halden/Reveal";
import { asset } from "@/lib/halden/paths";
import { studioUrl } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Enquire",
  description: "The house replies to every enquiry.",
};

export default async function EnquirePage() {
  const back = studioUrl((await headers()).get("host"), "/portfolio/halden");

  return (
    <main className="relative flex min-h-[640px] flex-1 lg:grid lg:grid-cols-2">
      {/*
        Desktop: the corridor is the left half of the page. Below that it sits
        behind the form instead, quiet enough to read straight through.
      */}
      <div className="absolute inset-0 opacity-15 lg:relative lg:inset-auto lg:opacity-100">
        <Image
          src={asset("/images/corridor.jpg")}
          alt="An upstairs corridor lined with dark green panelled doors, one of them standing open to the light."
          fill
          priority
          quality={82}
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="relative flex items-center px-[var(--gutter)] py-16 lg:py-24">
        <div className="w-full max-w-[420px]">
          <Reveal>
            <h1 className="font-halden-display text-halden-display font-light">Enquire.</h1>
            <p className="max-w-[34ch] pt-4 text-halden-base">
              The house replies to every enquiry.
            </p>
          </Reveal>

          <Reveal className="pt-12">
            <EnquireForm />
          </Reveal>

          {/*
            The way back out of the house. A plain next/link, not 64's
            TransitionLink: the page transition provider lives in app/(64) and
            this tree sits outside it.

            Brass, and deliberately so: everything else on this page is ink,
            so the one brass control is the one that leaves the house. That is
            a different thing from Send, and it is meant to look it.

            It is the deeper brass rather than the flat one, which is what
            lets it stay brass at all: at 11px the standard brass measures
            3.44:1 on limewash where AA wants 4.5, and this is 4.63:1. Same
            hue, scaled to 84% — the signal survives and the label is legible.
            Do not swap it back to `halden-brass` for consistency with the
            footer; that trade only works on larger text.

            On a subdomain this has to be an absolute URL to 64studios.com: the
            two are different origins there, and a root-relative path would
            resolve back into the house.
          */}
          <Reveal className="pt-10">
            <Link
              href={back}
              className="inline-block border border-halden-brass-deep/70 px-3 py-2 text-halden-micro uppercase tracking-halden-label text-halden-brass-deep transition-colors duration-300 hover:border-halden-ink hover:text-halden-ink"
            >
              Back to 64 Studios
            </Link>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
