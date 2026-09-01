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
      /**
       * Holds this section's note at the tighter measure. The garden copy is
       * the shortest of the six; run to the full width it strands its last
       * line on its own.
       */
      narrowCopy?: boolean;
    }
  | { kind: "inset"; src: string; alt: string; align: "left" | "right" };

export const houseSequence: HouseBlock[] = [
  {
    kind: "plate",
    src: "/images/hall.jpg",
    alt: "The entrance hall, where a stone staircase curves up past a tall window above a chequered marble floor.",
    eyebrow: "The Hall",
    copy:
      "Eighteen was built in 1794 and has been a house, a legation, a solicitor’s chambers and, for eleven regrettable years, a bank. The stone stair is original. Everything else has been put back the way it should have been left.",
  },
  {
    kind: "plate",
    src: "/images/bar.jpg",
    alt: "The bar in the front room: dark green walls, a marble-topped walnut counter and red leather stools beneath tall sash windows.",
    eyebrow: "The Bar",
    copy:
      "The bar takes the front room, where the windows run floor to ceiling and the afternoon light lasts longest. Walnut, Carrara, a brass rail worn thin at one end. Six stools, which is fewer than the room could hold and about right for the conversation. It opens at four and closes when it closes.",
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
      "One table, twelve places, laid the same way every day. The kitchen sends out four things at lunch and six at dinner, and will make something else if asked properly. Members dine together or not at all, which sounds severe until you have done it.",
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
      "Three thousand volumes, most of them unread and a few of them irreplaceable. The chair by the window has been sat in since 1962 and shows it. Quiet here is a matter of convention rather than rule, which has proved more reliable.",
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
      "Six rooms on the upper floors, for members who find themselves in town, or who would rather not go home. Linen, wool, a walnut bed, a window that opens. Nothing else, deliberately. Breakfast is at eight and is not negotiable.",
  },
  {
    kind: "plate",
    src: "/images/courtyard.jpg",
    alt: "The garden at the back: a teak bench against an old brick wall, flanked by clipped box in terracotta pots.",
    eyebrow: "The Garden",
    narrowCopy: true,
    copy:
      "A walled garden at the back — York stone, jasmine on old brick, a bench that has been rained on for thirty years. It is not large. On this street, that it exists at all is the point.",
  },
];
