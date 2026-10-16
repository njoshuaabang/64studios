// Every word on the site, verbatim from handoff/reference/content.md.
export const site = {
  title: "Solstice Construction | Extensions and loft conversions in Wiltshire",
  description:
    "Family-run design and build from Amesbury: extensions, loft conversions, refurbishments and renovations, with every trade in-house.",
  name: "Solstice Construction",
  phone: "07788 762 407",
  email: "office@solsticeconstruction.co.uk",
  credit: "Design proposal by 64 Studios",
};

export const nav = {
  links: [
    { href: "/work", label: "Work" },
    { href: "/process", label: "Process" },
    { href: "/about", label: "About" },
  ],
  estimate: { href: "/estimate", label: "Get an estimate" },
  menu: "Menu",
};

export const hero = {
  headline: ["More house.", "Same address."],
  subline:
    "Extensions, loft and garage conversions across Salisbury, Amesbury and Wiltshire. Designed and built by one team, from first drawing to final clean.",
  primary: { href: "/estimate", label: "Get an estimate" },
  ghost: { href: "/work", label: "See the work" },
  underline: "Six questions, a price range, then a free quote. Design and build, every trade in-house.",
};

export type Figure = { value: string; label: string; countTo?: number; suffix?: string };

export const figures: Figure[] = [
  { value: "40+", label: "years in construction", countTo: 40, suffix: "+" },
  { value: "2", label: "generations, father and son", countTo: 2 },
  { value: "FMB", label: "Federation of Master Builders member" },
  { value: "In-house", label: "every trade, start to finish" },
];

export const caseStudy = {
  href: "/work#newbury",
  lead: "Newbury:",
  line: "a conservatory became a kitchen-diner.",
  cta: "See the build →",
  label: "Newbury, Berkshire",
  caption:
    "The old conservatory came down and a kitchen-diner went up in its place, with glazing the full width of the garden. Solstice designed and built it.",
};

export const credentials = "Federation of Master Builders member · Design and build, fully project-managed";

export const steps = [
  { title: "Estimate.", body: "Answer six questions online for a price range." },
  { title: "Design and quote.", body: "We design it with you and give you a written quote." },
  { title: "Build.", body: "Every trade in-house, managed from start to finish." },
];

export const trustBody =
  "Solstice is a father-and-son firm from Amesbury with over 40 years in construction. Design, build and every trade stay in-house, so one team answers for the whole job.";

export const holding = {
  backHome: "Back home",
  estimate: {
    title: "Get an estimate",
    intro: "Six questions about your project, then a price range and a free quote.",
    // The phone and email are rendered as links between these fragments.
    status: ["The estimate is being built; for now, call ", " or email ", "."],
  },
  work: { title: "Work", body: "Recent extensions, loft conversions and renovations. The full gallery is coming." },
  process: { title: "How it runs" },
  about: { title: "About" },
};
