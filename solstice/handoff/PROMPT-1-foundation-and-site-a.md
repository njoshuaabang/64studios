# Prompt 1: Foundation and Site A

You're building a design proposal for **Solstice Construction Ltd**, a family-run, father-and-son design-and-build firm in Amesbury, Wiltshire. It has over 40 years in construction, is an FMB member and keeps every trade in-house.

This is one half of a test. Two homepages share one codebase and differ in one thing only:

- **Site A** (this prompt): one screen, no scroll, with the proof inside the hero.
- **Site B** (the next prompt): the same hero with one trust section below it.

Everything shared must be built once and reused, so the two can't drift apart.

## Read these first

Read all of these before writing any code. They are the spec, and this prompt only says how to put them together.

- `handoff/reference/design-tokens.md`: colours, type, spacing, components, logo use
- `handoff/reference/content.md`: every word on the site, plus alt text. Use it exactly.
- `handoff/reference/images.md`: photo slots, sources, crops
- `handoff/reference/motion.md`: intro, hero crossfade, page transitions, reduced motion
- `handoff/brand/`: the logo SVGs

If anything here conflicts with those files, the files win. If something you need isn't covered, choose the simplest option that fits the tokens and list your choice in your report.

## Stack

- Next.js (latest, App Router, TypeScript), Tailwind CSS, `gsap` with `@gsap/react`, `lenis` (installed now, used in prompt 2), `sharp` and `@vercel/analytics`.
- Fonts come from `next/font/google`: Archivo with the `wdth` axis, and Hanken Grotesk.
- No other UI or animation libraries.

## Build steps

1. **Scaffold** the Next.js app in this folder without touching `handoff/`.
2. **Brand:** copy `handoff/brand/*.svg` into `public/brand/`. Make `app/icon.svg` from `solstice-mark.svg`.
3. **Photos:** write `scripts/fetch-photos.mjs`, which:
   - downloads the website slots listed in `images.md`;
   - copies any files that exist in `handoff/photos-manual/`, which take priority over downloads of the same slot;
   - resizes everything with `sharp` into `public/photos/` under the slot filenames.

   Run it, and log which slots are present and which are missing.
4. **Tokens:** put every token into `app/globals.css` as CSS variables and map them into Tailwind's theme.
5. **Photo list:** `lib/photos.ts` exports the slots. A server-side check picks the hero set: `hero-newbury-kitchen` if the file exists, otherwise `hero-roof-frame-sunset`, then `hero-garden-room` and `hero-walnut-kitchen`.
6. **Shared components**, built to be reused by Site B unchanged:
   - `Logo`: the inline SVG, in reversed and light variants, with the rays, horizon and wordmark addressable for the intro.
   - `Nav`: desktop links plus the estimate button. On mobile, "Menu" opens a full-screen Ink panel that traps focus and closes on Esc.
   - `Hero`: full-bleed photo crossfade with the grade and scrim, and a slot for content.
   - `HeroContent`: headline, subline, the two buttons and the line under them.
   - `Figures`: the four trust figures with count-up, in a `compact` layout (Site A) and a `full` layout (Site B).
   - `CaseStudyLine` and `CredentialsLine`.
   - `Intro`: the once-per-session panel.
   - `TransitionProvider` and `TransitionLink`: the page transition from `motion.md`.
   - `Button`: primary and ghost.
   - `HoldingPage`: the layout for the holding pages.
7. **Site A** as `components/home/HomeA.tsx`, rendered by `app/page.tsx` (layout below).
8. **Holding pages:** `/estimate`, `/work` (with the `#newbury` section), `/process` and `/about`, using the copy in `content.md`.
9. **Analytics and indexing:**
   - Add `<Analytics />` in the root layout.
   - Every "Get an estimate" click calls `track('estimate_click', { variant: 'a', location })`, where `location` is `nav` or `hero`.
   - Set noindex/nofollow metadata on every page and add an `app/robots.ts` that disallows everything.

## Site A layout

The homepage is exactly one screen: `100svh`, with `overflow: hidden` on html and body **on this page only**. There's nothing below it, and no scrollbar appears at any size.

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Solstice logo]              Work   Process   About   [Get an estimate] │
│                                                                     │
│ More house.                                                         │
│ Same address.                                                       │
│ Subline, max width 34rem                                            │
│ [Get an estimate]  [See the work]                                   │
│ Six questions, a price range, then a free quote. Design and build…  │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────── │  1px rule, Limestone 30%
│ 40+              2                FMB              In-house    │ Newbury: a conservatory … See the build → │
│ years in…        generations…     Federation…      every trade… │                                           │
│ Federation of Master Builders member · Design and build…     Design proposal by 64 Studios │
└─────────────────────────────────────────────────────────────────────┘
```

- **Structure:** a flex column. The nav sits at the top and the bottom band is pinned to the bottom. The headline block is left-aligned and vertically centred in the space between, on the 12-column grid starting at column 1.
- **Bottom band:**
  - The figures run across about 60% of the width. The case study line is right-aligned, two lines at most.
  - The credentials line and "Design proposal by 64 Studios" sit on the bottom edge in small type.
  - The bottom gradient from `design-tokens.md` sits behind the band.
- **Below 768px:**
  - The nav becomes the logo plus "Menu".
  - The buttons sit side by side if they fit, otherwise they stack at full width.
  - The figures become a 2 × 2 grid.
  - The case study line and the credentials line are hidden; the FMB figure carries the credential.
  - "Design proposal by 64 Studios" stays.
- **If it doesn't fit:** if the page can't fit at 375 × 667 with body text at 15px or more, don't shrink the type or hide more. Stop and report exactly what overflows. That result is part of the test.
- **Motion:** the figures count up as the intro finishes. Nothing on this page reacts to scroll.

## Rules

- Use only the words in `content.md` and only Solstice's photos. No stock images, renders, icons for decoration, invented figures or reviews.
- No extra sections, features, custom cursor or preloader beyond the intro.
- Never remove focus outlines. Keep one H1 per page, add a skip link, use alt text from `content.md`, and make tap targets at least 44px.
- Animate only transform and opacity, plus the SVG stroke in the intro. Wait for `document.fonts.ready` before SplitText, so nothing shifts.
- Load the first hero photo with `priority` and `sizes="100vw"`. Target LCP under 2.5s.

## Before you report back

Verify each of these yourself in the browser, not just in code:

1. `npm run build` passes with no type or lint errors.
2. Screenshot the homepage at 1440 × 900, 1280 × 800, 768 × 1024, 390 × 844 and 375 × 667. Confirm there's no scrollbar, nothing is clipped, and body text is at least 15px at each size.
3. The intro plays on first load, skips on reload in the same tab, and is replaced by fades with reduced motion emulated.
4. The hero crossfade cycles and pauses when the tab is hidden.
5. Every nav link and button runs the cover-and-reveal transition, and browser back plays the reveal.
6. The keyboard alone reaches every link in order with a visible amber focus ring, and the mobile menu opens, traps focus and closes on Esc.
7. Page source shows noindex, and `/robots.txt` disallows everything.

Then report:
- what you built;
- the five screenshots;
- which photo slots are missing;
- anything that didn't fit at 375 × 667;
- any choice you made that these files didn't cover.
