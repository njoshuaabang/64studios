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

| | 64 Studios | Halden |
| --- | --- | --- |
| Colour | `ink`, `bone`, `background` | `halden-*` |
| Type | `font-display`, `font-body` | `font-halden-*` |
| Scale | Tailwind's default (`text-xs`…) | `text-halden-micro` … `text-halden-hero` |

Halden's CSS — gutters, `.house` measurements, selection, focus ring — is scoped
to the `.halden` wrapper set in `app/(halden)/halden/layout.tsx`. Nothing stops a 64 page writing
`text-halden-ink`, the way separate configs once did; keep to your own
namespace.

The standalone app in `halden/` is the pre-merge original, kept only as a
reference. It is excluded from `tsconfig.json` and is not built or served.


## Nash Calloway Design

The third self-initiated case study, served at `/nash-calloway` as a section of
this site rather than a separate deployment. Pages live under
`app/(nash)/nash-calloway/`, components in `components/nash/`, data and helpers
in `lib/nash/`, and photography in `public/nash/images/`.

Nine projects drive twelve routes from one array in `lib/nash/projects.ts` —
adding a tenth adds a page and a sitemap entry with no other edit. All project
copy is verbatim from the studio handoff.

| | Nash Calloway |
| --- | --- |
| Colour | `nash-walnut`, `nash-terracotta`, `nash-plaster`, `nash-olive`, `nash-brass`, `nash-ink` |
| Type | `font-nash-display` (Space Grotesk), `font-nash-body` (Inter) |

Its scoped CSS — ground, selection, brass focus ring — hangs off the `.nash`
wrapper in `app/(nash)/nash-calloway/layout.tsx`.

Two rules worth keeping: the panel entrance in `components/nash/Entrance.tsx`
is the site's only motion — the hero is a single held frame, not a rotation —
and every project photograph sits in the framing device in
`components/nash/Plate.tsx`.

The entrance is gated by an inline script in `app/layout.tsx` that sets
`data-ncd-entrance` on `<html>` before paint. It has to be a raw inline script
rather than `next/script`: a `beforeInteractive` script inside `<body>` is
queued until after hydration begins, far too late for a gate the first frame
depends on. It plays on every load of the home page, and is skipped entirely
under `prefers-reduced-motion`.

## Commands

```bash
npm run dev
npm run build
```
