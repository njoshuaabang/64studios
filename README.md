# 64 Studios

Luxury branding for interior designers. A threshold, not a landing page.

## Stack

- Next.js (App Router) + Tailwind CSS + GSAP (SplitText)
- Fonts: General Sans (display) and Satoshi (body), self-hosted from Fontshare via `next/font/local`

## Brand system

Three tokens only, locked in `tailwind.config.ts`:

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#FDFCFB` | Page ground |
| `ink` | `#454545` | All text and primary marks |
| `bone` | `#E3E0D4` | Decorative only — rules, tonal blocks, never text |

No pure black, no pure white, no third color. Spacing in 8px multiples.

## Routes

- `/` — non-scrollable threshold homepage with GSAP entrance (skipped under `prefers-reduced-motion`)
- `/portfolio` — project grid seeded from `config/portfolio.ts`
- `/portfolio/[slug]` — case study template
- `/studio` — manifesto
- `/contact` — mailto enquiry
- `/halden` — Halden, the second case study (see below)
- `/clara-ashdown` — Clara Ashdown Design, the third case study (see below)

## Halden

Halden is a section of this site, not a separate deployment: one app, one build,
one dev server. Its pages live under `app/(halden)/halden/`, its components in
`components/halden/`, its helpers in `lib/halden/`, and its photography in
`public/halden/images/`.

64 Studios' own pages sit in `app/(64)/`, which is where the corner nav and page
transition are applied. The root layout is a shell: it declares both brands'
font variables and nothing else.

### Keeping the brands apart

One Tailwind config serves all three, so the prefix is the boundary:

| | 64 Studios | Halden | Clara Ashdown |
| --- | --- | --- | --- |
| Colour | `ink`, `bone`, `background` | `halden-*` | `clara-*` |
| Type | `font-display`, `font-body` | `font-halden-*` | `font-clara-*` |
| Scale | Tailwind's default (`text-xs`…) | `text-halden-micro` … `text-halden-hero` | `text-clara-micro` … `text-clara-dropcap` |

Halden's CSS — gutters, `.house` measurements, selection, focus ring — is scoped
to the `.halden` wrapper set in `app/(halden)/halden/layout.tsx`, and Clara's —
gutter, drop cap, selection, focus ring — to the `.clara` wrapper set in
`app/(clara)/clara-ashdown/layout.tsx`. Nothing stops a 64 page writing
`text-halden-ink`, the way separate configs once did; keep to your own
namespace.

The standalone app in `halden/` is the pre-merge original, kept only as a
reference. It is excluded from `tsconfig.json` and is not built or served.

## Clara Ashdown Design

Clara Ashdown Design is the third self-initiated case study, and like Halden it
is a section of this site rather than a separate deployment. Its pages live
under `app/(clara)/clara-ashdown/`, its components in `components/clara/`, its
copy and helpers in `lib/clara/`, and its photography in `public/clara/images/`.

It is the text-led register of the three: the writing carries the site, not the
photography. Four things are deliberate and should survive any edit.

- **A colophon, not a footer.** Every page closes with the typeface credit and
  where the work was made. There is no second set of nav links down there.
- **Drop caps on long-form only.** Every case study and journal essay opens
  with one, set in `.dropcap` (globals.css). Never on nav, forms or the
  colophon.
- **Entry numbering, never dates.** The journal is a numbered sequence —
  "Entry No. 01" — and no timestamp appears anywhere on the site. Case studies
  are not a sequence, so they carry no number.
- **One motion signature.** A single fade-and-rise, on the home hero and on
  each page's `h1`. No scroll reveals, no card staggers, no colour change on
  hover — hover moves letter-spacing and draws an underline, nothing else.

Type is Fraunces and Inter via `next/font/google`; the palette is the five
tokens below and nothing else.

| | Clara Ashdown |
| --- | --- |
| Colour | `clara-chalk`, `clara-ink`, `clara-stone`, `clara-sage`, `clara-brass` |
| Type | `font-clara-display` (Fraunces), `font-clara-body` (Inter) |
| Scale | `text-clara-micro` … `text-clara-dropcap` |

Work and journal entries are data, in `lib/clara/work.ts` and
`lib/clara/journal.ts`; adding to either array adds a route and a sitemap
entry. An entry with no `essay` is listed on the index but has no page.

## Commands

```bash
npm run dev
npm run build
```
