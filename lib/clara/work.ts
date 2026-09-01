import { asset } from "./paths";

export type ClaraImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  location: string;
  /** First paragraph. Takes the drop cap; never include one in `body`. */
  opening: string;
  body: string[];
  cover: ClaraImage;
  detail: ClaraImage;
};

/**
 * The three projects, in the order they are shown. Case studies are not a
 * sequence the way the journal is, so they carry no numbering — see
 * `journal.ts`, where the numbering is the whole point.
 *
 * Copy is verbatim from the practice’s own writing. `opening` is split out
 * from `body` because the drop cap belongs to the first paragraph alone.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "the-malt-house",
    title: "The Malt House",
    location: "Guiting Power, Gloucestershire",
    opening:
      "The Malt House had been empty for eleven years when its new owners found it — a converted 18th-century maltings on the edge of the village, with a roofline that dipped in the middle like a resting animal. Everyone who’d looked at it before had talked about “potential,” which is usually estate-agent language for “problems.” I saw a building that had been waiting, patiently, to be asked what it wanted rather than told.",
    body: [
      "The brief, as it arrived, was fairly typical: open the ground floor up, bring in more light, make it liveable for a family of four without losing the reason they’d bought it in the first place. What made this one different was how much the owners were willing to leave alone. We kept the uneven floor in the old drying room rather than levelling it. We left a soot mark above the original kiln opening that most clients would have asked me to paint over.",
      "The work took fourteen months, most of it slower than anyone would have liked, because good lime plaster asks you to wait for it rather than the other way round. The kitchen sits where the maltings’ loading bay used to be, with the original stone lintel still doing its job above the window. Nothing in the house looks new. That was the point.",
    ],
    cover: {
      src: asset("/images/malt-house-exterior.jpg"),
      width: 2000,
      height: 2841,
      alt: "A terrace of honey-coloured stone cottages along a quiet lane, their stone-tiled roofs dipping and mossed over, with roses growing up the wall.",
    },
    detail: {
      src: asset("/images/malt-house-interior.jpg"),
      width: 1800,
      height: 1800,
      alt: "A dark timber-framed interior, with a lantern hanging beside a small window and daylight caught in the leaves outside it.",
    },
  },
  {
    slug: "two-elms-farm",
    title: "Two Elms Farm",
    location: "near Burford, Oxfordshire",
    opening:
      "Two Elms came to me already half-restored, which is sometimes harder than starting from nothing. A previous owner had done a great deal of work in the early 2000s — competent, expensive, and entirely wrong for the house. Underfloor heating had gone in under old flagstone. A conservatory had been added onto the north face, where it caught no sun at all. My first job wasn’t design. It was undoing.",
    body: [
      "We took the conservatory down and rebuilt the boundary wall where it had originally stood, using stone salvaged from a barn collapse two farms over — close enough in colour and age that within a year you won’t be able to tell where the old wall ends and the new one begins. Inside, we stripped back three layers of paint from a beamed ceiling that had been covered over sometime in the 1980s, apparently because a previous owner thought exposed oak looked “too rustic” for a dinner party.",
      "The clients at Two Elms were unusually patient with a process that mostly involved removing things rather than adding them. By the end, the house had about a third less “improvement” in it than when we started, and felt, by every account, twice the size.",
    ],
    cover: {
      src: asset("/images/two-elms-wall.jpg"),
      width: 1800,
      height: 1200,
      alt: "A dry-stone wall built without mortar, lichen over its stones, with rough grass growing up against the foot of it.",
    },
    detail: {
      src: asset("/images/two-elms-interior.jpg"),
      width: 1800,
      height: 1800,
      alt: "Bare oak roof timbers meeting at a joint against a pale plastered ceiling.",
    },
  },
  {
    slug: "the-old-rectory",
    title: "The Old Rectory",
    location: "Bibury, Gloucestershire",
    opening:
      "Rectories are a particular kind of building — built for a specific kind of life that mostly doesn’t exist anymore, with rooms sized for a household of servants and a vicar’s family neither of which the current owners had. The temptation with a house like this is to fight its proportions. I’ve learned it’s better to let them win.",
    body: [
      "The clients at the Old Rectory wanted a working family kitchen where the original scullery had been, and a study where a housekeeper’s parlour used to sit. Rather than knock through walls to make the ground floor feel more “open plan” — a phrase I try gently to talk people out of, on buildings like this one — we kept the sequence of small rooms intact and let each one do one thing well. The old parlour’s fireplace, blocked up since sometime in the 1970s, is lit again most evenings.",
      "It’s a quieter project than most of what I do, mostly because so little of it involved construction at all. Some houses need to be rebuilt. This one mostly needed permission to be itself again.",
    ],
    cover: {
      src: asset("/images/old-rectory-exterior.jpg"),
      width: 2000,
      height: 1333,
      alt: "A stone farmhouse set back behind a gravel track, its steep tiled roof gone gold with moss and climbing roses across the front of it.",
    },
    detail: {
      src: asset("/images/old-rectory-fireplace.jpg"),
      width: 1800,
      height: 1200,
      alt: "An open stone hearth with a cast-iron stove set into it and oil lamps standing on the ledge above.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/**
 * The opening sentence of a case study, used as its standfirst on the work
 * index. Taken from the essay itself rather than written twice, so the two
 * can never drift apart.
 */
export function firstSentence(text: string): string {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}
