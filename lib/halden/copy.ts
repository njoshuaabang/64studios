/**
 * Every word on the Halden site, in one file.
 *
 * It used to be in five: the room sequence in its own module, the particulars
 * in another, and the restoration, the enquiry and the threshold written
 * inline in the page or component that rendered them. Changing a line meant
 * working out which of the five it lived in first.
 *
 * Layout stays where layout belongs. What sits here beside the prose is the
 * part of an image that is content — its source and its alt text — and the
 * two flags that say a section takes a narrower measure or steps out of the
 * column, because those belong to the section rather than to the stylesheet.
 *
 * Measurements carry non-breaking spaces between figure and unit, so a narrow
 * measure can never leave "10ft" on one line and "4in" on the next. The same
 * goes for the pairs in the particulars that are read as one token: Band\u00A0H,
 * Grade\u00A0II.
 */

/* ── / ──────────────────────────────────────────────────────────────── */

export const threshold = {
  location: "Marylebone, London W1",
  lead: "A restored Georgian townhouse. Six bedrooms, a walled garden, 1794.",
  enter: "Enter",
  imageAlt:
    "The front elevation of 18 Marylebone: a black Georgian door in pale Portland stone, set between tall sash windows behind the original iron railings.",
};

/* ── /the-house ─────────────────────────────────────────────────────── */

export type HouseSection = {
  src: string;
  alt: string;
  /** Room label above the copy. Stored in sentence case, uppercased in CSS. */
  eyebrow: string;
  copy: string;
  /** Set where a portrait source has to be cropped hard to a landscape slot. */
  objectPosition?: string;
  /** Holds this section's note at the tighter measure. */
  narrowCopy?: boolean;
  /** The one section that steps out of the column to full width. */
  bleed?: boolean;
};

export const houseTitle = "The House.";

export const houseIntro =
  "Eighteen is a Grade\u00A0II listed townhouse built in 1794, restored over two years and completed in 2026. Five thousand two hundred and forty square feet across five floors, six bedrooms, four reception rooms and a walled garden of six hundred and forty square feet — which in this part of Marylebone is the rarest thing in the particulars.";

export const houseSections: HouseSection[] = [
  {
    src: "/images/hall.jpg",
    alt: "The entrance hall, looking the depth of the house to the original cantilevered stone staircase, above a chequered marble floor laid to the 1794 pattern.",
    eyebrow: "The Hall",
    copy:
      "The entrance hall runs the depth of the house to the original cantilevered stone staircase, which survives intact and has been cleaned rather than replaced. The chequered marble is new, laid to the 1794 pattern recorded in the survey drawings. Cornicing throughout this floor is original.",
  },
  {
    src: "/images/bar.jpg",
    alt: "The front room, facing north-east onto the street through three floor-to-ceiling sash windows with their original shutters, fitted as a bar in walnut and Carrara marble.",
    eyebrow: "The Bar",
    copy:
      "The front room, 22ft\u00A0by\u00A016ft, facing north-east onto the street through three floor-to-ceiling sash windows with their original shutters. Fitted as a bar in walnut and Carrara marble, with a brass rail and mirrored back shelving. The fittings are bespoke and included in the sale.",
  },
  {
    src: "/images/dining.jpg",
    alt: "The dining room at the back of the ground floor, with two south-facing sash windows, restored ceiling plasterwork and the chimneypiece original to the house.",
    eyebrow: "The Dining Room",
    copy:
      "A formal dining room seating twelve, 24ft\u00A0by\u00A015ft, with two south-facing sashes and restored plasterwork to the ceiling. The chimneypiece is original to the house. Serving access runs directly from the kitchen below by the original back stair.",
    objectPosition: "center 58%",
  },
  {
    src: "/images/library.jpg",
    alt: "The library, with two walls of fitted walnut shelving, a working fireplace and a west-facing window onto the garden, above the original boards lifted and relaid.",
    eyebrow: "The Library",
    copy:
      "Two walls of fitted walnut shelving, made for the house and included in the sale, with a working fireplace and a west-facing window onto the garden. The floor here is the original board, lifted, repaired and relaid during the restoration.",
    objectPosition: "center 64%",
  },
  {
    src: "/images/bedroom.jpg",
    alt: "A second-floor bedroom under a 10ft\u00A04in ceiling, with an original sash window draught-sealed and double-glazed to conservation specification.",
    eyebrow: "The Bedrooms",
    copy:
      "Six bedrooms across the second and third floors, including a principal suite with dressing room and bathroom. Every room retains its original sash windows, draught-sealed and double-glazed to conservation specification. Ceiling heights are 10ft\u00A04in on the second floor and 9ft\u00A02in on the third.",
  },
  {
    src: "/images/courtyard.jpg",
    alt: "The south-facing walled garden, laid in York stone with mature jasmine trained to the original brick boundary walls, repointed in lime mortar.",
    eyebrow: "The Garden",
    narrowCopy: true,
    bleed: true,
    copy:
      "A south-facing walled garden of 640\u00A0sq\u00A0ft, laid in York stone with mature jasmine trained to the brick. The walls are original boundary walls, repointed in lime mortar. Outside space of this size is exceptional for a Marylebone townhouse, and is not replicable.",
  },
];

/* ── the particulars, read by the table and the residence schema alike ── */

export const particularsHeading = "Particulars";

export const particulars: { label: string; value: string }[] = [
  { label: "Accommodation", value: "5,240\u00A0sq\u00A0ft / 486.8\u00A0sq\u00A0m" },
  { label: "Bedrooms", value: "Six, including principal suite" },
  { label: "Bathrooms", value: "Five, and a cloakroom" },
  { label: "Reception rooms", value: "Four" },
  { label: "Outside", value: "Walled garden, 640\u00A0sq\u00A0ft" },
  { label: "Tenure", value: "Freehold" },
  { label: "Local authority", value: "City of Westminster" },
  { label: "Council tax", value: "Band\u00A0H" },
  { label: "EPC", value: "D" },
  { label: "Listing", value: "Grade\u00A0II" },
  { label: "Restoration", value: "Completed 2026" },
  { label: "Architect", value: "Lockhart Sneddon" },
];

/** Separated from the rest of the list, and the only figure anyone looks for. */
export const guidePrice = { label: "Guide price", value: "£9,750,000" };

/** The numeric form, for the Offer in the residence schema. */
export const guidePriceValue = 9750000;

/* ── /the-restoration ───────────────────────────────────────────────── */

export const restoration = {
  title: "The restoration.",
  paragraphs: [
    "Eighteen was built in 1794 as one of a terrace of six and remained a single house until 1954, when it was divided into eight flats. By the time Colebrook acquired it in 2023, four floors of original plan had been lost, the stair had been boxed in, and the garden was under concrete.",
    "The work took two years. The principle throughout was that anything original and sound would be kept, anything original and failing would be repaired, and anything lost would be replaced to the evidence rather than to taste. The 1794 survey drawings held by Westminster Archives were the reference for the plan, the cornice profiles and the floor pattern in the hall.",
    "The stone stair survived and has been cleaned. Eleven of the fourteen chimneypieces are original to the house; the remaining three were sourced from the period. Every sash window was removed, repaired and reinstated with slim-profile double glazing to conservation specification — the boxes, weights and shutters are the 1794 originals throughout.",
    "What is new is new without pretending otherwise. The kitchen, the bathrooms, the services and the plant are of this decade and make no attempt to be Georgian. The house has underfloor heating, whole-house ventilation, and an EPC of D, which for a Grade\u00A0II townhouse of this age is at the upper end of what is achievable.",
    "Lockhart Sneddon acted as architect. Consent was granted by the City of Westminster in March 2023 and the works completed in April 2026.",
  ],
  /** The two detail shots, moved here out of the room sequence. */
  details: [
    {
      src: "/images/door-handle.jpg",
      alt: "A brass lever handle and keyhole plate on an original panelled door, retained and refinished rather than replaced.",
    },
    {
      src: "/images/corridor.jpg",
      alt: "A second-floor corridor lined with original panelled doors, one standing open to the sash window at the end.",
    },
  ],
  stair: {
    src: "/images/stair-above.jpg",
    alt: "The original cantilevered stone staircase seen from the top floor, winding down past its mahogany handrail to the chequered marble of the hall.",
  },
  link: "Arrange a viewing →",
};

/* ── /enquire ───────────────────────────────────────────────────────── */

export const enquire = {
  title: "Enquire.",
  intro:
    "Viewings are by appointment, accompanied, and arranged through the selling agent. Proof of funds is requested before a second viewing.",
  fields: {
    name: "Name",
    email: "Email",
    telephone: "Telephone",
    message: "Message",
  },
  submit: "Send",
  submitting: "Sending",
  sent: "Thank you. The selling agent will be in touch.",
  error: "A name and an email address, please.",
  back: "Back to 64 Studios",
};

/* ── chrome ─────────────────────────────────────────────────────────── */

export const nav = [
  { path: "/the-house", label: "The House" },
  { path: "/the-restoration", label: "The Restoration" },
  { path: "/enquire", label: "Enquire" },
];

export const footer = {
  address: "18 Marylebone, London W1",
  email: "enquiries@halden.london",
  particulars: "Particulars (PDF)",
  developer: "A Colebrook restoration.",
  credit: "Self-initiated concept.",
  studio: "64 Studios",
};

/* ── metadata ───────────────────────────────────────────────────────── */

/** The one sentence that exists only for machines, in the residence schema. */
export const residenceDescription =
  "A Grade\u00A0II listed Georgian townhouse at 18 Marylebone, London W1, built in 1794 and restored in 2026.";

export const meta = {
  site: {
    title: "Halden | Restored Georgian Townhouse for Sale, Marylebone W1",
    description:
      "A Grade\u00A0II listed 1794 townhouse in Marylebone, restored 2026. Six bedrooms, four reception rooms and a walled garden. Guide price £9,750,000, freehold.",
    ogDescription: "A restored Georgian townhouse for sale in Marylebone, London W1.",
  },
  house: {
    title: "The House | Halden, Marylebone Townhouse for Sale",
    description:
      "Room by room through 5,240\u00A0sq\u00A0ft across five floors — hall, bar, dining room, library, six bedrooms and a south-facing walled garden.",
  },
  restoration: {
    title: "The Restoration | Halden, 18 Marylebone W1",
    description:
      "A two-year restoration of a Grade\u00A0II listed 1794 townhouse by Colebrook, with Lockhart Sneddon. What was kept, repaired and replaced.",
  },
  enquire: {
    title: "Enquire | Halden, Marylebone W1",
    description:
      "Arrange a viewing of Halden, a restored Georgian townhouse in Marylebone. By appointment, through the selling agent.",
  },
};
