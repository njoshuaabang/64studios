import { asset } from "./paths";
import type { ClaraImage } from "./work";

export type JournalEntry = {
  /** Position in the sequence. Rendered as "Entry No. 01" — never a date. */
  number: number;
  title: string;
  /** Set on entries that have not been written yet; shown on the index. */
  dek?: string;
  /** Written entries only. Without it, the entry has no page and no link. */
  essay?: {
    slug: string;
    /** First paragraph. Takes the drop cap; never include one in `body`. */
    opening: string;
    body: string[];
    image: ClaraImage;
  };
};

/**
 * The journal is a numbered sequence, not a feed. There is no publication
 * date anywhere on this site — the number is the whole of the metadata, and
 * `entryNumber` below is the only place its format is decided.
 *
 * Entries 03 to 05 are announced but unwritten, so they carry a dek and no
 * essay. The index renders those as plain text rather than dead links.
 */
export const journal: JournalEntry[] = [
  {
    number: 1,
    title: "On restraint",
    essay: {
      slug: "on-restraint",
      opening:
        "Every stone farmhouse I’ve worked on has an opinion about itself — where the light wants to fall, which wall was never meant to be plaster. My job is mostly to listen, and occasionally to disagree. A good restoration should look like nothing happened at all; like the house simply kept living, the way it always meant to.",
      body: [
        "Clients occasionally ask, gently, whether this means I’m against change. I’m not. I’m against change that announces itself. There’s a kind of renovation — I see the results in property listings all the time — that exists mainly to prove that money was spent. New oak where old oak stood. Reclaimed brick laid in patterns no eighteenth-century mason would have bothered with. It photographs well. It rarely feels like home six months in.",
        "Restraint, in my work, means asking what a room needs before I ask what it could have. Most old houses need less than people think: better light, quieter heating, a floor that doesn’t need mentioning. What they don’t need is a decorator’s fingerprints all over them.",
      ],
      image: {
        src: asset("/images/journal-on-restraint.jpg"),
        width: 1800,
        height: 2700,
        alt: "An empty room with its plaster worn back to the stone beneath, and a bar of afternoon light lying across the boards from one shuttered window.",
      },
    },
  },
  {
    number: 2,
    title: "What lime plaster teaches you to wait for",
    essay: {
      slug: "what-lime-plaster-teaches-you",
      opening:
        "Lime plaster cures slowly, on its own schedule, and it will not be rushed. You can push a modern gypsum skim coat through in a day. Lime asks for weeks, sometimes longer, and it will crack and sulk if you try to heat a room too quickly while it’s setting. Every client who’s worked with me on a listed building has, at some point, asked why we’re still waiting.",
      body: [
        "I’ve come to think the waiting is the actual education. A house that’s stood for two hundred years wasn’t built by people in a hurry, and it doesn’t respond well to people who are. The plaster is the most literal version of a lesson I try to apply everywhere else in the work: the building sets its own pace, and the job is to work with that pace rather than around it.",
        "It’s also, frankly, the best plaster for old stone. It breathes where gypsum traps damp behind it. But I’d probably use it even if it weren’t — there’s something worth preserving in a material that simply cannot be rushed.",
      ],
      image: {
        src: asset("/images/journal-lime-plaster.jpg"),
        width: 1800,
        height: 2700,
        alt: "A close-up of an old plastered wall, its surface cracked into a fine web and patched in warmer tones where it has been made good.",
      },
    },
  },
  {
    number: 3,
    title: "Why I don’t do open-plan",
    dek: "On the rooms a period house asks you to keep separate",
  },
  {
    number: 4,
    title: "The trouble with reclaimed stone",
    dek: "On sourcing material that has to lie about its own age",
  },
  {
    number: 5,
    title: "A short defence of the airing cupboard",
    dek: "On small, unglamorous rooms worth saving",
  },
];

/** "Entry No. 01". The leading zero is kept, per the tokens. */
export function entryNumber(n: number): string {
  return `Entry No. ${String(n).padStart(2, "0")}`;
}

export const writtenEntries = journal.filter(
  (entry): entry is JournalEntry & { essay: NonNullable<JournalEntry["essay"]> } =>
    entry.essay !== undefined
);

export function getEntry(slug: string) {
  return writtenEntries.find((entry) => entry.essay.slug === slug);
}
