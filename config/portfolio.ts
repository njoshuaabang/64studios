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
  /** Further situation paragraphs, on the one case study taken deeper. */
  situationExtra?: string[];
  approachHeading: string;
  approach: string[];
  /** Small strings: services, stack, metrics. */
  specs: string[];
  /**
   * The two deeper sections. Optional because only the one case study the
   * brief asked to take further carries them — the other two keep the short
   * situation-and-approach shape rather than being padded to match.
   */
  decisions?: { title: string; body: string }[];
  shipped?: string[];
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
    situationExtra: [
      "The category is crowded and its websites are interchangeable. A hero shot of a bar at golden hour, a paragraph about community, a membership form, and a photograph of people laughing at a table nobody in the building has ever sat at. They are all selling access, and they all sell it in the same voice.",
      "Halden's problem was the opposite of a marketing problem. There are twelve places at one table and six stools at the bar. Anything the site did to widen the audience would have damaged the thing it was advertising, so reach was never the measure. The site had to turn the wrong visitor away as efficiently as it drew the right one in.",
    ],
    approachHeading: APPROACH_HEADING,
    approach: [
      "Most private clubs sell themselves in the language of a hotel. Halden is a house in Marylebone that behaves like one — a black door, six stools at the bar, twelve places at one table. The identity and the site were built to withhold rather than persuade.",
      "Nothing on the site explains what a private house is, because a visitor who needs that explained is not the visitor. It shows the rooms and states the terms, then stops.",
      "The identity follows the building rather than the category. Zodiak, a high-contrast transitional serif, is the period voice for a house built in 1794, and Switzer carries everything functional underneath it. The palette is limewash and deep green taken off the walls themselves, with brass reserved for the things that have to be found rather than read.",
    ],
    decisions: [
      {
        title: "The home page does not scroll",
        body: "One viewport: the door, the name, and one way in. A page that refuses to scroll is normally a mistake, and here it is the argument. The whole proposition is that most of the house is not shown to you, so a home page stacking benefit columns beneath a hero would have contradicted its own copy in its structure.",
      },
      {
        title: "Brass had to become two colours",
        body: "Brass at 11px on limewash measures 3.44:1, under the 4.5 that AA asks for at body sizes. Rather than drop the colour from small text, the palette gained a second brass at 84% of the first, the same hue measuring 4.63:1, used wherever brass has to carry something that will actually be read. The accent survives and so does the type.",
      },
      {
        title: "The nav stays out of the way on the sequence",
        body: "On the house page the nav is hidden until the reader has committed to scrolling, because that page is a sequence of rooms and a bar fixed across the top of each one reads as browser chrome rather than as part of the house. It appears after 24 pixels of scroll. It also appears immediately for anyone arriving by keyboard, since a control that reveals only on scroll is a trap for a reader who does not scroll.",
      },
      {
        title: "The rooms are a column, not a grid",
        body: "Nine rooms could have been a grid of nine thumbnails. They are a single centred column instead, one room to a screen. A grid invites comparison, and a house is not a set of options to be weighed against each other. You move through it in an order, and the page was built to be moved through the same way.",
      },
    ],
    shipped: [
      "Four pages: the threshold, the house, membership and the enquiry.",
      "A wordmark set in Zodiak with its own letter-spacing, and a palette of five. The type scale stops at 40px so that no heading can outgrow the mark by accident.",
      "Nine room plates and three detail shots, art-directed and sequenced rather than gathered.",
      "A three-field enquiry form, the shortest the house could ask for and still reply properly.",
      "Built in Next.js and deployed on Vercel, with GSAP for the threshold sequence and the reveals. Every animation is gated on prefers-reduced-motion.",
      "The whole brand is scoped under one CSS class, so it shares a single stylesheet with two other brands without either reaching into the other's type.",
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
        src: "/portfolio/halden/site-04.jpg",
        alt: "The Halden membership page: four short paragraphs about how membership works, centred on limewash above a photograph looking down the stairwell.",
        placement: "approach",
      },
      {
        src: "/portfolio/halden/site-05.jpg",
        alt: "The Halden house page at the top of its sequence: the title The House above a full-width photograph of the entrance hall, with no navigation bar in sight.",
        placement: "approach",
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
    subtitle: "An independent watchmaker with a single reference",
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
