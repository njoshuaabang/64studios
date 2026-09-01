# Halden

A private members' house in a Georgian townhouse in Marylebone. Four pages, no CMS.

Self-initiated concept for the 64 Studios portfolio. The house is fictional.

```bash
npm install && npm run dev
```

Runs on port 3100, so it does not collide with the studio site in the parent directory.

## Pages

| Route         | What it is                                                                 |
| ------------- | -------------------------------------------------------------------------- |
| `/`           | Threshold. Exactly 100dvh, no scroll, no nav, no footer. One way in.        |
| `/the-house`  | Nine images in sequence, each with a note in the margin.                    |
| `/membership` | Four paragraphs in a 560px column, one image, one link out.                 |
| `/enquire`    | Split layout, form posting to a stub server action.                         |

`/` sits outside the `(site)` route group so it can render without the chrome
that every other page carries.

## Design system

Four colours, and the Tailwind palette is **replaced** rather than extended, so
there is no reachable utility for pure black, pure white, or a grey.

| Token    | Value     | Used for                          |
| -------- | --------- | --------------------------------- |
| ink      | `#1C1C1A` | Type, the threshold overlay       |
| limewash | `#F2EFE9` | Page background, everywhere       |
| green    | `#22302A` | Selection only                    |
| brass    | `#9A7B4F` | Links, rules, focus rings         |

`theme.fontSize` is replaced too, and stops at 40px. No heading can outgrow the
wordmark by reaching for a larger utility, because there isn't one.

Spacing is an 8px scale indexed by step — `p-1` is 8px, `p-8` is 64px.

Type is [Zodiak](https://www.fontshare.com/fonts/zodiak) (high-contrast
transitional serif, for the wordmark and headings) and
[Switzer](https://www.fontshare.com/fonts/switzer) (body and UI), both from
Fontshare and self-hosted as woff2 in `fonts/` rather than requested at runtime.

## Motion

Two effects, and no more:

1. **Reveal** — fade up 16px over 1.2s, ease-out, once, on entering view.
   Everything that animates on scroll wraps itself in `<Reveal>`.
2. **Threshold entrance** — image over 1.4s, then the wordmark 0.6s in, then the
   line, then the link. Then it stops. Nothing on that page moves again.

Plus a 300ms opacity fade between pages, in CSS.

No parallax, no scroll-jacking, no cursor effects, no hover scale on images, no
counters, no marquees.

Hidden starting states are set in JavaScript, never in CSS. The server HTML
contains every element at full opacity, so `prefers-reduced-motion: reduce` —
which makes both animated components return before touching the DOM — and a
failed or disabled script all leave the page readable.

## Images

Sources live in `public/images/`, resized to 2560px on the long edge and
re-encoded (about 7.7MB for twelve, down from 95MB). `next/image` handles the
rest; `sizes` is set per slot and `priority` only on the two above-fold images,
`threshold.jpg` and `corridor.jpg`, plus the first plate on `/the-house`.

On `/the-house` the images carry the page. Primary rooms run from the end of the
copy rail to the right edge of the viewport; detail shots hang off one edge,
alternating sides. All of it comes from one table of custom properties in
`globals.css` — gutter, rail, gap and heights per breakpoint (900 / 1200 / 1440).

Bleeds are percentages of the document, never `100vw`. `100vw` includes the
vertical scrollbar, so `calc(100vw - 480px)` would overflow by exactly the
scrollbar width and produce a horizontal scrollbar.

Two portrait sources are cropped hard into landscape slots, so they carry an
explicit `objectPosition` in `lib/house.ts` — centred, the dining table and the
library armchair both fall out of frame.

## Spacing

Two vertical tokens on `/the-house`, and only these: `--space-section` (96px)
between blocks, `--space-copy-image` (24px) between the rail and its image when
they stack. `--gutter` is separate and shared — the nav, the footer, the copy
rail and both other pages all hang off it, so their left edges line up.

## SEO

Every page builds its metadata through `pageMetadata()` in `lib/seo.ts`, so the
title, description, Open Graph and Twitter cards cannot drift apart. `threshold.jpg`
is the shared social image. `LocalBusiness` JSON-LD sits in the root layout.

**`robots: { index: false, follow: false }` is set in `app/layout.tsx` and inherited
by every page. This is a self-initiated concept and must not compete in search
results against real Marylebone clubs. Do not remove it without asking Joshua.**

## Deploying

Vercel. This project is a subdirectory, so set **Root Directory** to `halden` in
the project settings. `turbopack.root` and `outputFileTracingRoot` are already
pinned in `next.config.ts` for the same reason.

### Served under /halden

The app is built with `basePath: '/halden'`, so it lives at `/halden` on **every**
deployment, its own included — `https://<deployment>.vercel.app/halden`. Hitting
the bare root 307s to `/halden` so the standalone URL still works from the root.

`basePath` is inlined into the client bundle at build time. Changing the prefix
means changing `lib/basePath.ts` and rebuilding; nothing reads it at runtime.

To rewrite it onto another domain, add this to **that** project's `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/halden/:path*",
      "destination": "https://<this-deployment>.vercel.app/halden/:path*"
    }
  ]
}
```

The prefix must match on both sides. The rewrite has to forward `/halden/_next/:path*`
as well, which the `:path*` wildcard above already covers — without it the page
HTML arrives unstyled because the chunks 404.

Set `NEXT_PUBLIC_SITE_URL` to the public origin so canonical and OG URLs point at
the domain people actually visit rather than the Vercel deployment.

The enquiry form posts to a server action in `app/(site)/enquire/actions.ts`
that logs and returns a confirmation. Point it at something real before this
takes an actual enquiry.
