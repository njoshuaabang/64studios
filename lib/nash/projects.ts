/**
 * The nine projects. Copy is lifted verbatim from the handoff's content.md —
 * location, scope, duration and the reasoning line are the site's only prose,
 * so they are data rather than markup.
 */

export const collections = ["LA & Malibu", "London", "Resort-style", "Artist Homes"] as const;

export type Collection = (typeof collections)[number];

export type NashImage = {
  src: string;
  alt: string;
  /** "during" images are genuine construction/renovation shots, not styled. */
  stage: "after" | "during";
};

export type NashProject = {
  slug: string;
  name: string;
  collection: Collection;
  location: string;
  scope: string;
  duration: string;
  move: string;
  images: NashImage[];
};

export const projects: NashProject[] = [
  {
    slug: "carbon-beach-house",
    name: "Carbon Beach House",
    collection: "LA & Malibu",
    location: "Malibu, California",
    scope: "Full interior architecture and furnishing, 6,400 sq ft, oceanfront",
    duration: "14 months",
    move:
      "The original solid parapet along the beach-facing elevation was doing structural work that a glass balustrade could do just as well. We replaced it with a single continuous run of low-iron glass, removing the last visual barrier between the living floor and the water without touching the load path behind it.",
    images: [
      { src: "/nash/images/carbon-after.jpg", stage: "after", alt: "A low modern house behind palms, its glazed beach elevation open to the light." },
      { src: "/nash/images/carbon-during.jpg", stage: "during", alt: "The same structure under construction, roof and wall framing still exposed." },
    ],
  },
  {
    slug: "stone-canyon-residence",
    name: "Stone Canyon Residence",
    collection: "LA & Malibu",
    location: "Bel Air, Los Angeles",
    scope: "Full renovation and restoration of a 1962 post-and-beam residence, 5,200 sq ft",
    duration: "16 months",
    move:
      "The house's post-and-beam frame was the reason it worked in 1962, and later owners had built walls into its bones to meet changing codes. We rebuilt the structure to current standards without moving a single post, then stripped the infill back to glass — restoring the exact proportions the frame was designed around.",
    images: [
      { src: "/nash/images/stone-after.jpg", stage: "after", alt: "A post-and-beam room lined in warm timber, glazed the full width of the wall." },
      { src: "/nash/images/stone-during.jpg", stage: "during", alt: "A room stripped back to its wooden framing during the rebuild." },
    ],
  },
  {
    slug: "rockledge-drive",
    name: "Rockledge Drive",
    collection: "LA & Malibu",
    location: "Hollywood Hills, Los Angeles",
    scope: "Full interior renovation of a 1958 hillside residence, 4,600 sq ft",
    duration: "12 months",
    move:
      "A 1980s renovation had raised the living room floor to match the rest of the plan, erasing the sunken conversation pit the house was built around. We lowered it back eighteen inches and rebuilt the fireplace wall in the home's original board-formed concrete — the room had been designed to gather people downward, and it does again.",
    images: [
      { src: "/nash/images/rockledge-after.jpg", stage: "after", alt: "A living room gathered around a stone fireplace, timber ceiling above." },
      { src: "/nash/images/rockledge-during.jpg", stage: "during", alt: "Board-formed concrete, poured and struck, before the room was finished." },
    ],
  },
  {
    slug: "chester-square-townhouse",
    name: "Chester Square Townhouse",
    collection: "London",
    location: "Belgravia, London",
    scope: "Full interior renovation of a Grade II-listed townhouse, 7,100 sq ft across five floors",
    duration: "19 months",
    move:
      "Five floors of a Georgian townhouse are naturally dark at the core, and most renovations solve that room by room. We rebuilt the central staircase in blackened steel and travertine as a single top-lit shaft, so one intervention brought daylight to all five floors instead of five separate fixes.",
    images: [
      { src: "/nash/images/chester-after.jpg", stage: "after", alt: "A white stucco terrace of London townhouses behind bare trees." },
      { src: "/nash/images/chester-during.jpg", stage: "during", alt: "A stair stripped back to bare timber during the rebuild." },
    ],
  },
  {
    slug: "holland-park-villa",
    name: "Holland Park Villa",
    collection: "London",
    location: "Holland Park, London",
    scope: "Full interior renovation of a detached villa, 6,800 sq ft, plus garden studio conversion",
    duration: "15 months",
    move:
      "A mid-1990s conservatory had been added to bring the garden closer, but it did the opposite — boxing the view behind a low glass lean-to. We removed it entirely and rebuilt the rear elevation in steel-framed glass at full height, so the ground floor faces the garden instead of apologizing for it.",
    images: [
      { src: "/nash/images/holland-after.jpg", stage: "after", alt: "The villa seen across its garden, the garden front open to the lawn." },
      { src: "/nash/images/holland-during.jpg", stage: "during", alt: "Scaffolding standing across the elevation while the rear was rebuilt." },
    ],
  },
  {
    slug: "grosvenor-square-mansion",
    name: "Grosvenor Square Mansion",
    collection: "London",
    location: "Mayfair, London",
    scope: "Full interior architecture and furnishing of a mansion apartment, 8,200 sq ft",
    duration: "21 months",
    move:
      "Four decades of subdivision had turned a single 1920s enfilade into a warren of smaller rooms. We removed the partition walls and restored the original 40-foot run the length of the piano nobile — the apartment's real proportions were still there, just built over.",
    images: [
      { src: "/nash/images/grosvenor-after.jpg", stage: "after", alt: "The mansion block on Grosvenor Square, stone facade and tall sash windows." },
      { src: "/nash/images/grosvenor-during.jpg", stage: "during", alt: "A room with the partition walls removed, floorboards and openings exposed." },
    ],
  },
  {
    slug: "punta-cielo",
    name: "Punta Cielo",
    collection: "Resort-style",
    location: "Riviera Maya, Mexico",
    scope: "New-build villa, interior architecture and furnishing, 9,800 sq ft, five bedrooms",
    duration: "22 months",
    move:
      "The site's cenote was the only reason to build here, so every primary room was oriented around a single sightline to it. We used pivoting timber screens instead of walls between interior and jungle, so the boundary itself changes through the day rather than staying fixed.",
    images: [
      { src: "/nash/images/punta-after.jpg", stage: "after", alt: "A round infinity pool on a timber deck, jungle running out to the sea beyond." },
      { src: "/nash/images/punta-during.jpg", stage: "during", alt: "The concrete frame of the villa during construction, openings not yet filled." },
    ],
  },
  {
    slug: "villa-serena",
    name: "Villa Serena",
    collection: "Resort-style",
    location: "Amalfi Coast, Italy",
    scope: "New-build villa, interior architecture and furnishing, 7,400 sq ft, terraced across three levels",
    duration: "18 months",
    move:
      "Most cliffside builds work outward from a flat pad cut into the rock. We carved each of the three terrace levels directly into the cliff face instead, so every primary room opens onto stone rather than a constructed edge — the house reads as something the site made room for, not something dropped onto it.",
    images: [
      { src: "/nash/images/serena-after.jpg", stage: "after", alt: "Terraced buildings stepping down a cliff face above the sea." },
      { src: "/nash/images/serena-during.jpg", stage: "during", alt: "The cliff face the terraces were cut into, stone left as found." },
    ],
  },
  {
    slug: "canon-drive-collection",
    name: "The Cañon Drive Collection",
    collection: "Artist Homes",
    location: "Beverly Hills, California",
    scope: "Full interior architecture built around a private contemporary art collection, 8,900 sq ft",
    duration: "17 months",
    move:
      "Most houses get decided first and hung with art afterward. Here we reversed the order — every wall, sightline, and lighting plan was designed backward from the collection's largest works, so the floor plan reads as a sequence of galleries first and living spaces second.",
    images: [
      { src: "/nash/images/canon-after.jpg", stage: "after", alt: "A single work hung on a white wall, lit from above." },
      { src: "/nash/images/canon-during.jpg", stage: "during", alt: "The room before installation, walls finished and empty." },
    ],
  },
];

export function getProject(slug: string): NashProject | undefined {
  return projects.find((p) => p.slug === slug);
}
