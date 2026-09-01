/**
 * The sequence for /the-house, in order. `plate` is a large image carrying a
 * note in the margin beside it; `inset` is a smaller image, offset and silent.
 */
export type HouseBlock =
  | {
      kind: "plate";
      src: string;
      alt: string;
      /** Room label above the copy. Stored in sentence case, uppercased in CSS. */
      eyebrow: string;
      copy: string;
      /** Set where a portrait source has to be cropped hard to a landscape slot. */
      objectPosition?: string;
    }
  | { kind: "inset"; src: string; alt: string; align: "left" | "right" };

/** Sits above the first section, set to the rail measure. */
export const houseIntro =
  "Halden occupies a restored 1794 townhouse in Marylebone, one of the last private members’ clubs in London to remain a single house rather than a collection of floors. Six bedrooms, a bar, a private dining room, a library and a walled garden — kept for a small membership, and looked after by people who have been here long enough to know your name.";

export const houseSequence: HouseBlock[] = [
  {
    kind: "plate",
    src: "/images/hall.jpg",
    alt: "The entrance hall, where a stone staircase curves up past a tall window above a chequered marble floor.",
    eyebrow: "The Hall",
    copy:
      "The entrance hall opens onto the original cantilevered stone staircase, restored in 2019 alongside the plasterwork and the chequered marble floor. It is the first thing members see and, by design, the quietest room in the house.",
  },
  {
    kind: "plate",
    src: "/images/bar.jpg",
    alt: "The bar in the front room: dark green walls, a marble-topped walnut counter and red leather stools beneath tall sash windows.",
    eyebrow: "The Bar",
    copy:
      "The bar occupies the front room, where floor-to-ceiling sash windows hold the afternoon light. Walnut, Carrara marble and a worn brass rail; six stools and a short, considered list built around English spirits and small-grower Champagne. Open from four o’clock, seven days a week.",
  },
  {
    kind: "inset",
    src: "/images/bar-detail.jpg",
    alt: "A cut crystal tumbler and a folded linen napkin on the marble bar top.",
    align: "right",
  },
  {
    kind: "plate",
    src: "/images/dining.jpg",
    alt: "The dining room, laid with one long walnut table, twelve red leather chairs and plain white plates.",
    eyebrow: "The Dining Room",
    copy:
      "Private dining in Marylebone for up to twelve, at a single walnut table. A daily menu of four dishes at lunch and six at dinner, changing with the market, with wine pairings chosen by the house. Available to members for private hire, with notice.",
    objectPosition: "center 58%",
  },
  {
    kind: "inset",
    src: "/images/linen-cups.jpg",
    alt: "Two white cups stacked on a brass tray beside a linen cloth, on a small table next to a worn leather armchair.",
    align: "left",
  },
  {
    kind: "plate",
    src: "/images/library.jpg",
    alt: "The library, with full-height walnut shelves of old books, a brass reading lamp and a red leather armchair.",
    eyebrow: "The Library",
    copy:
      "Three thousand volumes across two walls of walnut shelving, a working fireplace and the deepest chairs in the house. The library is where members read, work and meet quietly — no screens after six, by long-standing convention.",
    objectPosition: "center 64%",
  },
  {
    kind: "inset",
    src: "/images/door-handle.jpg",
    alt: "A worn brass lever handle and keyhole plate on a dark green panelled door.",
    align: "right",
  },
  {
    kind: "plate",
    src: "/images/bedroom.jpg",
    alt: "One of the bedrooms upstairs: a walnut bed dressed in white linen and a green wool blanket, beside a curtained sash window.",
    eyebrow: "The Rooms",
    copy:
      "Six bedrooms on the upper floors, for members staying in London. Linen, wool, a walnut bed and a window that opens onto the street. Breakfast is served from seven, in the room or downstairs, and the house will arrange anything else that is needed.",
  },
  {
    kind: "plate",
    src: "/images/courtyard.jpg",
    alt: "The garden at the back: a teak bench against an old brick wall, flanked by clipped box in terracotta pots.",
    eyebrow: "The Garden",
    copy:
      "A walled garden at the back — York stone, jasmine on old brick and a table under the plane tree. In a part of London where outdoor space is rare, it remains the most requested corner of the house.",
  },
];
