import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/clara/PageHeader";
import Prose from "@/components/clara/Prose";
import { asset } from "@/lib/clara/paths";

export const metadata: Metadata = {
  title: "About",
  description:
    "I trained as an architect before I trained as a decorator. I work alone, on a small number of period houses a year, across Gloucestershire and Oxfordshire.",
};

const opening =
  "I don’t renovate old houses so much as I negotiate with them. Every stone farmhouse I’ve worked on has an opinion about itself — where the light wants to fall, which wall was never meant to be plaster. My job is mostly to listen, and occasionally to disagree.";

const body = [
  "I trained as an architect before I trained as a decorator, which probably explains why I care more about where a wall sits than what covers it. I spent six years working on listed-building consent applications in Bath before I started taking on houses of my own — first for friends, then for friends of friends, and eventually for people I’d never met who’d heard, correctly, that I turn down more projects than I take.",
  "I work mostly on stone farmhouses and converted barns across Gloucestershire and Oxfordshire — buildings old enough to have settled into their own opinions about themselves. My clients tend to be people who bought something because of what it already was, not what it could become. That distinction matters more than anything else in how I work.",
  "A restoration, done well, shouldn’t announce itself. It should look like the house simply kept living — like nothing happened, except that everything did. I turn down full gut-renovation briefs for this reason; if a client wants a new house, there are architects who build those very well, and I’m happy to recommend a few. What I’m good at is continuity.",
  "I work alone, by design. A small number of projects a year, each one seen through from the first walk-through to the last coat of limewash. If you’re renovating a period property in the Cotswolds and want it to still feel like itself when you’re done, I’d like to hear from you.",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-clara-content px-[var(--gutter)] pb-[var(--space-section)]">
      <PageHeader title="About" />

      <div className="grid gap-6 md:grid-cols-[1fr_0.55fr] md:gap-10">
        <Prose opening={opening} body={body} />

        {/*
          One material close-up rather than a portrait. The practice is
          deliberately quiet about its principal.
        */}
        {/* A fixed ratio rather than a viewport height: the column sits
            beside the essay, so its shape should not change with the window. */}
        <figure className="relative order-first aspect-[4/5] overflow-hidden md:order-none md:self-start">
          <Image
            src={asset("/images/about-material.jpg")}
            alt="A small window set deep into a thick stone wall, its wooden shutter swung open onto green leaves outside."
            fill
            quality={82}
            sizes="(min-width: 760px) 34vw, 100vw"
            className="object-cover saturate-[0.94]"
          />
        </figure>
      </div>
    </div>
  );
}
