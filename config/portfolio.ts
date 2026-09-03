export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * A case-study image and where it sits in the page's rhythm. Every project
 * runs the same order — situation, its images, approach, its images — so the
 * placement is data rather than a decision each layout makes for itself.
 */
export type CaseStudyImage = {
  src: string;
  alt: string;
  placement: "situation" | "approach";
};

/**
 * One shape for every case study. There is no second shape and no per-project
 * component: `CaseStudyLayout` renders all of this and nothing renders around
 * it, so two projects cannot drift apart in spacing or type scale.
 *
 * The situation and approach prose was written for the case studies rather
 * than lifted from the projects, which had no copy in that form. It
 * is the one part of this file that is not verbatim from an approved
 * document, so it is the first place to look when the voice feels off.
 *
 * `cover` and `url` are not part of the case-study shape. They support the
 * listing card, the Open Graph image and the "Visit the site" button, which
 * exist whether or not a project has been written up.
 */
export type Project = {
  slug: string;
  title: string;
  /** One keyword-bearing line. Doubles as the listing descriptor. */
  subtitle: string;
  situationHeading: string;
  situation: string;
  approachHeading: string;
  approach: string[];
  /** Small strings: services, stack, metrics. */
  specs: string[];
  attribution: string;
  images: CaseStudyImage[];
  cover?: ProjectImage;
  url?: string;
};

const SITUATION_HEADING = "The situation";
const APPROACH_HEADING = "The approach";

export const projects: Project[] = [
  {
    slug: "nash-calloway",
    title: "Nash Calloway Design",
    subtitle: "An interior design and architecture studio in Los Angeles and London",
    situationHeading: SITUATION_HEADING,
    situation:
      "Nine finished projects across Los Angeles and London, and the problem that arrives with them: written up at length, good work starts to read like every other studio's. What made each house worth visiting was usually one decision, and that decision was buried.",
    approachHeading: APPROACH_HEADING,
    approach: [
      "A results-led register: nine projects, each shown as photography and a short factual note on the one move that mattered. The portfolio does the persuading, so the copy does not.",
    ],
    specs: ["Brand identity · Art direction · Website", "2026"],
    attribution: "Self-initiated concept.",
    images: [
      {
        src: "/portfolio/nash-calloway/site-01.jpg",
        alt: "The Nash Calloway Design homepage: the wordmark and three nav links over a photograph of a Malibu house behind palms at golden hour, with a single ENTER button centred low on the frame.",
        placement: "situation",
      },
      {
        src: "/portfolio/nash-calloway/site-02.jpg",
        alt: "The Nash Calloway Design portfolio page: collection filters for LA & Malibu, London, Resort-style and Artist Homes above a two-column grid of framed project photographs.",
        placement: "approach",
      },
      {
        src: "/portfolio/nash-calloway/site-03.jpg",
        alt: "A Nash Calloway Design project page: the write-up on the Carbon Beach House parapet above a pair of framed photographs, the finished house beside its roof framing under construction.",
        placement: "approach",
      },
    ],
    url: "/nash-calloway",
    cover: {
      src: "/portfolio/nash-calloway/cover.jpg",
      width: 2000,
      height: 1333,
      alt: "A low modern house behind palms, its glazed beach elevation open to the light.",
    },
  },
  {
    slug: "halden",
    title: "Halden",
    subtitle: "A private house in Marylebone",
    situationHeading: SITUATION_HEADING,
    situation:
      "A private house in a Georgian townhouse on a quiet Marylebone street, opening in a city with no shortage of them. What it had was restraint, which is the hardest quality to put on a website without spending it.",
    approachHeading: APPROACH_HEADING,
    approach: [
      "Most private clubs sell themselves in the language of a hotel. Halden is a house in Marylebone that behaves like one — a black door, six stools at the bar, twelve places at one table. The identity and the site were built to withhold rather than persuade.",
    ],
    specs: [
      "Brand identity · Art direction · Photography · Website",
      "Next.js · GSAP · Vercel",
      "2026",
    ],
    attribution: "Self-initiated concept.",
    images: [
      {
        src: "/portfolio/halden/site-01.jpg",
        alt: "The Halden enquiry page: a photograph of a panelled corridor fills the left half of the screen, with a three-field enquiry form set in the cream space on the right.",
        placement: "situation",
      },
      {
        src: "/portfolio/halden/site-02.jpg",
        alt: "The Halden house page: a short column of text about the building's history sits to the left of a large photograph of the stone staircase and chequerboard hall floor.",
        placement: "situation",
      },
      {
        src: "/portfolio/halden/site-03.jpg",
        alt: "The Halden homepage: the wordmark, the word Marylebone and a single ENTER link centred over a dimmed photograph of the black front door.",
        placement: "situation",
      },
      {
        src: "/portfolio/halden/hall.jpg",
        alt: "The entrance hall at Halden — a stone staircase curving up past a tall window, above a black and white chequerboard marble floor.",
        placement: "approach",
      },
      {
        src: "/portfolio/halden/bar.jpg",
        alt: "The bar at Halden — a walnut counter with a marble top and six oxblood leather stools, in a room panelled and painted deep green.",
        placement: "approach",
      },
      {
        src: "/portfolio/halden/library.jpg",
        alt: "The library at Halden — a worn oxblood leather armchair and a brass reading lamp in front of floor-to-ceiling shelves of old books.",
        placement: "approach",
      },
    ],
    url: "/halden",
    cover: {
      src: "/portfolio/halden/cover.jpg",
      width: 2560,
      height: 1911,
      alt: "The black front door of number 18, with a brass knocker and letterplate, set behind black iron railings on a Marylebone street.",
    },
  },
  {
    slug: "aldern-voss",
    title: "Aldern & Voss",
    subtitle:
      "An independent watchmaker, built from one reference and a sideways walk through its parts.",
    situationHeading: SITUATION_HEADING,
    situation:
      "An independent watchmaker with one reference and nothing around it — no variants, no colourways, no price list. There is almost nothing for a catalogue to list, and a conventional brand site would have had to talk around the watch rather than show it.",
    approachHeading: APPROACH_HEADING,
    approach: [
      "The site opens on the watch itself, taken apart and drawn back together once before the name appears. Nothing is claimed while that is happening.",
      "The reference is then walked through sideways: seven components, the page scrolling down while the watch travels across, each part held long enough to read one line about it. Case, dial, movement, crown, strap, case back, and the watch worn.",
    ],
    specs: ["Brand identity · Art direction · Photography · Website", "2026"],
    attribution: "Self-initiated concept.",
    images: [
      {
        src: "/portfolio/aldern-voss/site-01.jpg",
        alt: "The Aldern & Voss threshold: the watch held on screen in the upper zone, with the wordmark, the positioning line and a Begin Experience button on solid bone beneath it.",
        placement: "situation",
      },
      {
        src: "/portfolio/aldern-voss/site-02.jpg",
        alt: "The Aldern & Voss reference page part-way through its horizontal sequence: the watch worn on a wrist, captioned 07 Worn beneath the photograph.",
        placement: "approach",
      },
      {
        src: "/portfolio/aldern-voss/site-03.jpg",
        alt: "The Aldern & Voss workshop page: the founding line set large above a photograph of a leather worker cutting a strap blank by hand, with the Why Florence text beside it.",
        placement: "approach",
      },
    ],
    url: "/aldern-voss",
    cover: {
      src: "/portfolio/aldern-voss/cover.jpg",
      width: 2560,
      height: 1440,
      alt: "A wristwatch standing upright on a pale surface: a steel case with a silver-grey dial, blued hands and applied baton indices, on a tan leather strap.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
