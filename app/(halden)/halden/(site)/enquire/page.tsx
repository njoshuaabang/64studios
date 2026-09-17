import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import EnquireForm from "@/components/halden/EnquireForm";
import Reveal from "@/components/halden/Reveal";
import { studioUrl } from "@/lib/sites";
import { enquire, meta } from "@/lib/halden/copy";

export const metadata: Metadata = {
  // Absolute: the metadata table sets the whole string, so the
  // "%s — Halden" template must not append to it.
  title: { absolute: meta.enquire.title },
  description: meta.enquire.description,
};

export default async function EnquirePage() {
  const back = studioUrl((await headers()).get("host"), "/portfolio/halden");

  // One column. The corridor that used to fill the left half has moved to
  // /the-restoration, where it belongs to the account of the work rather than
  // standing behind a form.
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-[640px] flex-1 items-center px-[var(--gutter)] py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[420px]">
        <div>
          <Reveal>
            <h1 className="font-halden-display text-halden-display font-light">{enquire.title}</h1>
            <p className="max-w-[38ch] pt-4 text-halden-base">
              {enquire.intro}
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

            On a subdomain this has to be an absolute URL to 64studios.design: the
            two are different origins there, and a root-relative path would
            resolve back into the house.
          */}
          <Reveal className="pt-10">
            <Link
              href={back}
              className="inline-block border border-halden-brass-deep/70 px-3 py-2 text-halden-micro uppercase tracking-halden-label text-halden-brass-deep transition-colors duration-300 hover:border-halden-ink hover:text-halden-ink"
            >
              {enquire.back}
            </Link>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
