# Images

All photos are Solstice's own. Website photos can be fetched automatically. Instagram photos can't (the links expire and Instagram wants a login), so they come from `handoff/photos-manual/` if you've saved them there.

Put every final file in `public/photos/` under the slot filename below. Run each through `sharp` once: max 2560px on the long edge, quality 82, plus AVIF and WebP via `next/image`.

## Slots

Website base URL: `https://www.solsticeconstruction.co.uk/wp-content/uploads/2025/12/`

| Slot filename | Used for | Source | Size now | If missing |
| --- | --- | --- | --- | --- |
| `hero-newbury-kitchen.jpg` | Hero image 1 | `handoff/photos-manual/hero-newbury-kitchen.jpg`: Instagram [Newbury post](https://www.instagram.com/solsticeconstructionltd/p/DV8jjX1jf9F/), photo 5 | 1440px square | Leave it out of the crossfade and use `hero-roof-frame-sunset.jpg` in its place |
| `hero-island-kitchen.jpg` | Hero image 2 (replaces the garden room) | `handoff/photos-manual/hero-island-kitchen.webp`, supplied by hand | 1600 × 900 | n/a |
| `hero-walnut-kitchen.jpg` | Hero image 3 | Website: `WhatsApp-Image-2025-12-09-at-09.32.53-2-scaled.jpeg` | 2560 × 1920 | n/a |
| `hero-roof-frame-sunset.jpg` | Stand-in hero image, only while the Newbury kitchen is missing | `handoff/photos-manual/hero-roof-frame-sunset.webp`, supplied by hand: a hip-roof frame against a blue sky (replaces the website sunset shot) | 1200 × 1600 | n/a |
| `newbury-rear.jpg` | Site B photo pair, front image; /work#newbury | Website: `1-after.jpeg` | 1200 × 1600 | n/a |
| `newbury-frame.jpg` | Site B photo pair, back image; /work#newbury | `handoff/photos-manual/newbury-frame.jpg`: Newbury post, photo 8 | 1440px square | Labelled Concrete placeholder: "Newbury frame photo: add newbury-frame.jpg" |

The case study on Site A is a line of text, so it needs no photo.

## Crops

Starting points for `object-position`. Check each one on screen at 375px and 1440px wide.

| Slot | object-position | Keep in frame |
| --- | --- | --- |
| hero-newbury-kitchen | 35% 55% | The glazing and the island |
| hero-island-kitchen | 40% 60% | The island and the walnut bar |
| hero-walnut-kitchen | 45% 60% | The walnut island |
| hero-roof-frame-sunset | 50% 55% | The roof frame and the sky |

## Quality

These are compressed copies: WhatsApp at around 1600–2560px, Instagram at 1440px. They'll look soft full-screen on a large retina display. Build with them now, and swap in Solstice's original phone files when they arrive. The filenames stay the same, so nothing else changes.

Never use stock photos, renders or AI images. Every photo on these sites must be Solstice's own work.
