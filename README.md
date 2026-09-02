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

Two rules worth keeping: the only motion is the panel entrance in
`components/nash/Entrance.tsx` and the hero crossfade in
`components/nash/Hero.tsx` — nothing scroll-triggered, nothing elsewhere — and
every project photograph sits in the framing device in
`components/nash/Plate.tsx`.

The hero dims each frame 30% with a per-image `brightness(0.7)` filter rather
than laying a scrim over the stack. The distinction matters during a dissolve:
the filter is applied to each frame before the crossfade blends them, so the
mid-transition result is still exactly 30% down, where two stacked scrims would
composite and pulse darker. If you ever swap back to a scrim, use one layer
above the stack, never one per frame.

The cost is measured and known — plaster chrome over those frames runs 2.41 to
4.58 to one where AA wants 4.5, clearing it on one frame of four, so the nav and
the button stay hard to read on the brighter frames. Clearing AA everywhere in
this rotation needs roughly a 63% dim.

The entrance is gated by an inline script in `app/layout.tsx` that sets
`data-ncd-entrance` on `<html>` before paint. It has to be a raw inline script
rather than `next/script`: a `beforeInteractive` script inside `<body>` is
queued until after hydration begins, far too late for a gate the first frame
depends on. It plays on every load of the home page, and is skipped entirely
under `prefers-reduced-motion`.

## Case-study subdomains

Each case study is reachable two ways: as a section of the main domain
(`64studios.com/nash-calloway`) and at the root of its own subdomain
(`nash-calloway.64studios.com`). Both serve the same route tree — the subdomain
is a second door, not a second copy.

`lib/sites.ts` is the only place the mapping lives. `middleware.ts` reads the
`Host` header and rewrites a subdomain request onto the site's path prefix, so
the visitor keeps a clean URL while the routes stay where they are. A prefixed
URL arriving on a subdomain is 308'd to its clean form, which is what catches
pasted links and old bookmarks instead of resolving them to
`/nash-calloway/nash-calloway/…`.

Links are host-aware rather than hardcoded: `nashBase()` resolves the prefix per
request for server components, and the Nash layout hands the same value to
client components through `NashBaseProvider`. That is why the nav emits
`/portfolio` on the subdomain and `/nash-calloway/portfolio` on the main domain
from one component. A link that leaves for 64 Studios goes through `studioUrl`,
which returns an absolute URL on a subdomain — a different origin there — and a
relative one on the main domain so it stays a client navigation.

Static assets are untouched: the middleware matcher skips anything with a file
extension, because `/nash/images/*.jpg` and `/aldern-voss/media/*.jpg` are
absolute paths baked into markup and bundles.

**Aldern & Voss cannot serve clean root URLs yet.** Its bundle carries
`basename: "/aldern-voss"` compiled in from Vite's `base`, so at a subdomain
root its router matches nothing. Until it is rebuilt with `base: "/"` — its Vite
source is not in this repository — its subdomain 308s to the prefixed path where
the app works. Flip `rootServed` to `true` in `lib/sites.ts` once it is.

**Halden is deliberately not in the table.** Routing it is one row, but
`haldenPath` is not host-aware the way `nashPath` now is, so its links would
keep emitting `/halden/…` and bounce through the redirect on every navigation.

### Pointing the subdomains (not done — needs account access)

The apex resolves to `35.215.109.174` with nameservers at SiteGround, and this
repository has no git remote and no linked deployment, so none of this could be
done from the codebase:

1. Push the repository and import it as a Vercel project.
2. Add `nash-calloway.64studios.com` and `aldern-voss.64studios.com` as domains
   on that project.
3. In SiteGround DNS, add a CNAME for each subdomain to the target Vercel gives
   you. The apex can stay pointed at SiteGround — subdomains resolve
   independently, so the existing site is unaffected.
4. Only once the subdomains resolve, add `alternates.canonical` to the Nash
   pages pointing at the subdomain. It is left out on purpose: canonical tags
   aimed at a hostname that does not resolve are worse than none.

## Commands

```bash
npm run dev
npm run build
```
