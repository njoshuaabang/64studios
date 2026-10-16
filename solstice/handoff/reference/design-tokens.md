# Design tokens

Define every value below as a CSS custom property in `app/globals.css`, and map them into Tailwind's theme. Components use the tokens, never raw hex.

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | #151617 | Text on light, photo scrim, intro and page-transition panel |
| `--limestone` | #F2F0EB | Text on photos; Site B trust section background |
| `--concrete` | #CFCBC4 | Rules, frame lines, borders, placeholder blocks |
| `--slate` | #5E6A73 | Secondary text and labels on Limestone (4.9:1 contrast) |
| `--amber` | #C9733A | The one accent: the sun mark, focus rings, active link tick, scroll cue. Never a large fill |

- **Photo scrim:** a flat `--ink` layer at 35% over every hero photo, so contrast holds on every crossfade slide.
- **Site A bottom gradient:** `--ink` 0% → 60%, over the bottom 40% of the hero, behind the figures.
- **Photo grade, starting point:** a `--amber` layer at 6% with `mix-blend-mode: soft-light` over the photo, under the scrim. Solstice's photos are bright daylight phone shots; this warms them so they sit together. Tune by eye.

## Type

Load both fonts with `next/font/google`. Archivo needs the `wdth` axis.

| Role | Font | Size | Line height | Tracking | Weight / width |
| --- | --- | --- | --- | --- | --- |
| Hero headline | Archivo | `clamp(3rem, 8vw, 7.5rem)` | 0.95 | −0.03em | 500, wdth 112 |
| Section heading (Site B) | Archivo | `clamp(2rem, 4vw, 3.5rem)` | 1.05 | −0.02em | 500, wdth 112 |
| Figure value | Archivo | `clamp(1.5rem, 2.6vw, 2.5rem)` | 1 | −0.02em | 500, wdth 112 |
| Body / subline | Hanken Grotesk | `clamp(1rem, 1.2vw, 1.125rem)` | 1.55 | 0 | 400 |
| Small / figure label | Hanken Grotesk | 0.875rem | 1.45 | 0 | 400 |
| Label (eyebrows, nav) | Hanken Grotesk | 0.75rem | 1.3 | 0.14em, uppercase | 500 |

Body text never goes below 15px, on any screen.

## Space and layout

- 8px base unit. Section padding on Site B: `clamp(64px, 10vw, 144px)` top and bottom.
- Page gutter: `clamp(16px, 4vw, 56px)` left and right. Content max width 1440px, centred.
- 12-column grid, 24px gaps, on desktop; a single column below 768px.
- Hairline rules: 1px `--concrete` on light, 1px `--limestone` at 30% on photos.

## Components

- **Primary button:** 48px tall, 0 24px padding, 2px radius, `--limestone` fill, `--ink` text, label style. On hover, an `--ink` fill sweeps in from the left (300ms) and the text turns `--limestone`.
- **Ghost button:** the same size, 1px `--limestone` border at 60%, `--limestone` text. On hover the border goes to 100% and a fill sweeps in at 10%.
- **Nav estimate button:** the ghost button at 40px tall.
- **Text links:** the underline draws left to right on hover (250ms).
- **Focus:** 2px `--amber` outline, 3px offset, on every interactive element. Never removed.

## Logo

Files are in `handoff/brand/`. Use `solstice-logo-reversed.svg` on photos and `solstice-logo.svg` on Limestone. Use `solstice-mark.svg` (7 rays) for the favicon and anything under 40px wide. The logo sits 28–32px tall in the nav. "Ltd" goes in the footer with the legal details, not in the logo.
