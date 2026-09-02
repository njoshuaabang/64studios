import type { Metadata } from "next";
import Link from "next/link";
import Entrance from "@/components/nash/Entrance";
import Hero from "@/components/nash/Hero";
import Nav from "@/components/nash/Nav";
import { nashPath } from "@/lib/nash/paths";

export const metadata: Metadata = {
  title: { absolute: "Nash Calloway Design" },
};

/**
 * One project, held still. Carbon Beach House is the frame the site opens on.
 */
const hero = {
  src: "/nash/images/carbon-after.jpg",
  alt: "A low modern house behind palms, its glazed beach elevation open to the light.",
};

export default function NashHomePage() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col">
      <Entrance />
      <Hero src={hero.src} alt={hero.alt} />

      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <Nav transparent />

        <div className="flex flex-1 flex-col justify-end px-4 pb-10 md:px-8 md:pb-14">
          {/*
            The hero carries no text of its own now — the photography and the
            one button are the whole of it. The name still has to exist as the
            page's heading, so it is here for assistive tech and search, and
            visible in the nav rather than twice over.
          */}
          <h1 className="sr-only">Nash Calloway Design</h1>

          <Link
            href={nashPath("/portfolio")}
            data-nash-cta
            className="inline-flex w-full max-w-[12rem] items-center justify-center self-center border border-nash-plaster px-8 py-[12px] font-nash-body text-sm uppercase tracking-wide text-nash-plaster transition-colors duration-200 hover:bg-nash-plaster hover:text-nash-ink"
          >
            Enter
          </Link>
        </div>
      </div>
    </main>
  );
}
