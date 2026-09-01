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
    slug: "nash-calloway",
    title: "Nash Calloway Design",
    descriptor: "An interior design and architecture studio in Los Angeles and London",
    category: "Brand & Website",
    year: "2026",
    url: "/nash-calloway",
    cover: {
      src: "/portfolio/nash-calloway/cover.jpg",
      width: 2000,
      height: 1333,
      alt: "A low modern house behind palms, its glazed beach elevation open to the light.",
    },
    scope: ["Brand identity", "Art direction", "Website"],
    summary: [
      "A results-led register: nine projects, each shown as photography and a short factual note on the one move that mattered. The portfolio does the persuading, so the copy does not.",
    ],
  },
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
