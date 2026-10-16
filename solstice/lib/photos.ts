import { existsSync } from "node:fs";
import path from "node:path";

export type PhotoSlot = {
  slot: string;
  src: string;
  alt: string;
  position: string;
  /** Placeholder label when the file hasn't been added yet. */
  missingLabel: string;
  exists: boolean;
};

// Slots, alt text and crops from handoff/reference/images.md and content.md.
const slots = {
  "hero-newbury-kitchen": {
    alt: "Open-plan kitchen-diner in a Newbury extension, with full-height glazing onto the garden",
    position: "35% 55%",
  },
  "hero-island-kitchen": { alt: "White kitchen with a lit island and a walnut breakfast bar", position: "40% 60%" },
  "hero-walnut-kitchen": { alt: "Kitchen with a walnut-fronted island and herringbone floor", position: "45% 60%" },
  "hero-roof-frame-sunset": { alt: "New timber roof frame against a blue sky", position: "50% 55%" },
  "newbury-rear": { alt: "The finished Newbury extension, seen from the garden", position: "50% 50%" },
  "newbury-frame": {
    alt: "The Newbury extension's roof frame going up",
    position: "50% 50%",
    missingLabel: "Newbury frame photo: add newbury-frame.jpg",
  },
} as const;

export type SlotName = keyof typeof slots;

// Server-only: checked against public/photos/ at render (build) time.
export function photo(name: SlotName): PhotoSlot {
  const s: { alt: string; position: string; missingLabel?: string } = slots[name];
  return {
    slot: name,
    src: `/photos/${name}.jpg`,
    alt: s.alt,
    position: s.position,
    missingLabel: s.missingLabel ?? `${name}.jpg`,
    exists: existsSync(path.join(process.cwd(), "public/photos", `${name}.jpg`)),
  };
}

/** The Newbury kitchen leads when present; otherwise the roof frame stands in for it. */
export function heroSet(): PhotoSlot[] {
  const first = photo("hero-newbury-kitchen");
  return [first.exists ? first : photo("hero-roof-frame-sunset"), photo("hero-island-kitchen"), photo("hero-walnut-kitchen")];
}
