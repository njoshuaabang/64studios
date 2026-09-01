import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/clara/PageHeader";
import { entryNumber, journal } from "@/lib/clara/journal";
import { claraPath } from "@/lib/clara/paths";
import { firstSentence } from "@/lib/clara/work";

export const metadata: Metadata = {
  title: "The Ashdown Journal",
  description:
    "Notes on restraint, patina, and the occasional argument with an old building.",
};

const entryTitle =
  "font-clara-display text-clara-title font-light [font-optical-sizing:auto]";

export default function JournalIndex() {
  return (
    <div className="mx-auto max-w-clara-content px-[var(--gutter)] pb-[var(--space-section)]">
      <PageHeader
        title="The Ashdown Journal"
        intro="Notes on restraint, patina, and the occasional argument with an old building."
      />

      {/*
        Numbered, never dated — the number is the whole of the metadata.
        Entries that have not been written yet are listed but not linked;
        they are set quieter than the rest, though not so quiet that they
        drop below a readable contrast on the chalk.
      */}
      <ol className="max-w-[62ch]">
        {journal.map((entry) => (
          <li key={entry.number} className="border-t border-clara-stone/50 py-5">
            <p className="pb-2 text-clara-meta text-clara-stone">
              {entryNumber(entry.number)}
            </p>

            {entry.essay ? (
              <Link
                href={claraPath(`/journal/${entry.essay.slug}`)}
                className="group block"
              >
                <h2 className={entryTitle}>
                  <span className="inline-block border-b border-transparent pb-px transition-[letter-spacing] duration-300 ease-out group-hover:border-clara-stone group-hover:tracking-[0.01em]">
                    {entry.title}
                  </span>
                </h2>
                <p className="max-w-[52ch] pt-2 font-clara-display text-clara-base font-light leading-[1.6] text-clara-ink/85">
                  {firstSentence(entry.essay.opening)}
                </p>
              </Link>
            ) : (
              <>
                <h2 className={`${entryTitle} text-clara-ink/70`}>{entry.title}</h2>
                <p className="max-w-[52ch] pt-2 font-clara-display text-clara-base font-light leading-[1.6] text-clara-ink/70">
                  {entry.dek}. Not written yet.
                </p>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
