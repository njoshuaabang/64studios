# Prompt 2: Site B

Site A is built. Now add **Site B**: the same hero, kept clean, with one trust section underneath and a short footer. It's the other half of a test of whether the homepage needs to scroll, so **reuse every shared component as it is**. Site A must look and behave exactly as it does now. If a shared component needs a new option for Site B, add it as a prop that defaults to the current behaviour.

Re-read `handoff/reference/content.md` (the Site B sections) and `handoff/reference/motion.md` (Site B scroll motion) before starting.

## Variant switch

- `app/page.tsx` renders `HomeA` or `HomeB` based on `NEXT_PUBLIC_SITE_VARIANT` (`a` by default, `b` for Site B).
- Read the variant from one place (`lib/variant.ts`), and pass it into analytics events.
- Each variant gets its own Vercel project from the same repo, with only this env var different.

## Site B layout

The page is the hero, one trust section and a footer. Add nothing else, or the test stops being about the scroll.

```
HERO: 100svh, same Hero + HeroContent as Site A, no bottom band
┌─────────────────────────────────────────────────────────────────────┐
│ [logo]                       Work   Process   About   [Get an estimate] │
│ More house. / Same address. / subline / buttons / line under them   │
│                                 │  ← scroll cue, bottom centre        │
└─────────────────────────────────────────────────────────────────────┘
TRUST SECTION: Limestone background, about 1.25 screens tall
┌─────────────────────────────────────────────────────────────────────┐
│ WHY SOLSTICE                              ┌──────────────┐          │
│ One family, every trade,                  │ newbury-frame│ (back)   │
│ start to finish.                     ┌────┴────────┐     │          │
│ Two-sentence body, max 30rem         │ newbury-rear│─────┘          │
│                                      │  (front)    │                │
│ 40+    2    FMB    In-house          └─────────────┘                │
│ Credentials line                     Newbury, Berkshire             │
│                                      Caption, max 26rem             │
│ ─────────────────────────────────────────────────────────────────── │
│ 01 Estimate         02 Design and quote        03 Build             │
│ ─────────────────────────────────────────────────────────────────── │
│ [Get an estimate]  [See the work]                                   │
└─────────────────────────────────────────────────────────────────────┘
FOOTER: Limestone, a 1px Concrete rule above, small Slate type
```

- **Nav:** it sits in the hero and scrolls away with it. There's no sticky header, so Site A and Site B behave the same at the top.
- **Text on Limestone:** use `Logo` light and `--ink` text, with `--slate` for labels and secondary text.
- **Photo pair:** the back image sits top-right; the front image overlaps its bottom-left corner by about 30%. Each image has a thin offset frame: a 1px `--concrete` outline, 12px down and right. If `newbury-frame.jpg` is missing, the back slot shows the labelled placeholder from `images.md`.
- **Figures:** the `full` layout of the shared `Figures` component.
- **Below 768px:**
  - Everything is one column, in this order: eyebrow, heading, body, photo pair (keep a smaller overlap), caption, figures in a 2 × 2 grid, credentials, steps stacked, buttons stacked at full width, footer.

## Motion

- Lenis smooth scroll, on the Site B homepage only. Start it in `HomeB`, sync it with ScrollTrigger as `motion.md` describes, and destroy it on unmount.
- Everything else under "Site B scroll motion" in `motion.md`: hero parallax and headline fade, staggered reveals, frame lines drawing, count-up at half-view, and the scroll cue.
- Reduced motion behaves as `motion.md` says.

## Analytics

- "Get an estimate" clicks call `track('estimate_click', { variant: 'b', location })`, where `location` is `nav`, `hero` or `trust`.
- `track('trust_seen', { variant: 'b' })` fires once per page view, when the trust section is 50% in view (IntersectionObserver).

## Before you report back

1. `npm run build` passes.
2. Run with `NEXT_PUBLIC_SITE_VARIANT=a`, then screenshot Site A at 1440 × 900 and 375 × 667. Compare with your screenshots from prompt 1 and confirm nothing changed.
3. Run with `NEXT_PUBLIC_SITE_VARIANT=b`, then screenshot Site B at 1440 × 900, 768 × 1024 and 375 × 667. Take full-page screenshots, and one of the trust section in view.
4. Scroll Site B with a mouse wheel and with the keyboard (Space, Page Down). Confirm the scrolling is smooth, the reveals play once, and nothing jumps.
5. With reduced motion emulated, confirm there's no smoothing, no parallax, and fades only.
6. Keyboard: every link in order with a visible focus ring.
7. Check both events fire in the network panel or the console.
8. Run Lighthouse mobile on both variants. Aim for Performance 85+ and Accessibility 95+, and report the scores.

Then report:
- what you built;
- the screenshots;
- the Lighthouse scores;
- anything in Site A you had to touch, and why.
