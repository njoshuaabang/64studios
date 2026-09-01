export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  descriptor: string;
  year: string;
  scope: string[];
  summary: string[];
  /** Shown on the work listing beside the year. Older entries predate this field. */
  category?: string;
  /** Card and Open Graph image. Projects without one fall back to the bone plate. */
  cover?: ProjectImage;
  /** Live site, when there is one. Drives the "Visit the site" button. */
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "halden",
    title: "Halden",
    descriptor: "A private house in Marylebone",
    category: "Brand & Website",
    year: "2026",
    url: "/halden",
    cover: {
      src: "/portfolio/halden/cover.jpg",
      width: 2560,
      height: 1911,
      alt: "The black front door of number 18, with a brass knocker and letterplate, set behind black iron railings on a Marylebone street.",
    },
    scope: ["Brand identity", "Art direction", "Photography", "Website"],
    summary: [
      "Most private clubs sell themselves in the language of a hotel. Halden is a house in Marylebone that behaves like one — a black door, six stools at the bar, twelve places at one table. The identity and the site were built to withhold rather than persuade.",
    ],
  },
  {
    slug: "aldern-voss",
    title: "Aldern & Voss",
    descriptor:
      "An independent watchmaker, built from one reference and a sideways walk through its parts.",
    category: "Brand & Website",
    year: "2026",
    url: "/aldern-voss",
    cover: {
      src: "/portfolio/aldern-voss/cover.jpg",
      width: 2560,
      height: 1440,
      alt: "A wristwatch standing upright on a pale surface: a steel case with a silver-grey dial, blued hands and applied baton indices, on a tan leather strap.",
    },
    scope: ["Brand identity", "Art direction", "Photography", "Website"],
    summary: [
      "Aldern & Voss. An independent watchmaker, built from one reference and a sideways walk through its parts.",
    ],
  },
  {
    slug: "clara-ashdown",
    title: "Clara Ashdown Design",
    descriptor: "A solo interior design practice in the Cotswolds",
    category: "Brand & Website",
    year: "2026",
    url: "/clara-ashdown",
    cover: {
      src: "/portfolio/clara-ashdown/cover.jpg",
      width: 2600,
      height: 1733,
      alt: "Honey-stone cottages along a quiet lane in the Cotswolds, in the shade of the trees above them.",
    },
    scope: ["Brand identity", "Art direction", "Editorial", "Website"],
    summary: [
      "A one-person practice that restores period houses, and writes about it better than most studios photograph. The site is built around the writing rather than a gallery: a journal numbered by entry instead of dated, drop caps set as a printed quarterly would, and a colophon where the footer usually goes.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
