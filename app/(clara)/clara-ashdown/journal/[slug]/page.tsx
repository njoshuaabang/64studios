import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/clara/PageHeader";
import Prose from "@/components/clara/Prose";
import { entryNumber, getEntry, writtenEntries } from "@/lib/clara/journal";
import { claraPath } from "@/lib/clara/paths";
import { firstSentence } from "@/lib/clara/work";

export function generateStaticParams() {
  return writtenEntries.map((entry) => ({ slug: entry.essay.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};

  return {
    title: entry.title,
    description: firstSentence(entry.essay.opening),
    openGraph: {
      title: entry.title,
      description: firstSentence(entry.essay.opening),
      images: [{ url: entry.essay.image.src }],
    },
  };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-clara-content px-[var(--gutter)] pb-[var(--space-section)]">
      <PageHeader title={entry.title} meta={entryNumber(entry.number)} />

      <div className="grid gap-6 md:grid-cols-[1fr_0.5fr] md:gap-10">
        <Prose opening={entry.essay.opening} body={entry.essay.body} />

        <figure className="relative order-first aspect-[4/5] overflow-hidden md:order-none md:self-start">
          <Image
            src={entry.essay.image.src}
            alt={entry.essay.image.alt}
            fill
            priority
            quality={82}
            sizes="(min-width: 760px) 32vw, 100vw"
            className="object-cover saturate-[0.94]"
          />
        </figure>
      </div>

      <Link
        href={claraPath("/journal")}
        className="mt-8 inline-block border-b border-clara-stone pb-px text-clara-nav text-clara-ink transition-[letter-spacing] duration-300 ease-out hover:tracking-[0.03em]"
      >
        ← Back to the journal
      </Link>
    </article>
  );
}
