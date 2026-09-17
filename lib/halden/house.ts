/**
 * The six rooms of /the-house, in the order a viewer walks them: the hall,
 * the two reception rooms at the front and back of the ground floor, the
 * library, the bedrooms above, and the garden.
 *
 * Every section is primary now. The three detail shots that used to gather
 * into a row at the foot are gone — two deleted as hospitality styling that
 * no longer fits a house for sale, one moved to /the-restoration — so the
 * block type they needed went with them.
 *
 * Measurements carry non-breaking spaces between figure and unit, so a
 * narrow measure can never leave "10ft" on one line and "4in" on the next.
 */
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
