# Motion

One motion system runs on both sites, so neither wins on polish. Animate only `transform` and `opacity`, apart from the SVG line drawing in the intro.

## Tools and curves

- GSAP with SplitText and ScrollTrigger. All three are free to use.
- Lenis smooth scroll on Site B only. Site A has nothing to scroll.
- Reveals ease with `cubic-bezier(0.16, 1, 0.3, 1)`. Panels ease with `cubic-bezier(0.76, 0, 0.24, 1)`. No other curves.

## Intro (first visit per browser session)

Use `sessionStorage` to remember the visit, wrapped in try/catch. If storage fails, play the intro.

1. A full-screen `--ink` panel holds the reversed logo mark, centred, about 120px wide.
2. The horizon line draws left to right over 600ms (`stroke-dasharray` / `stroke-dashoffset`).
3. The 13 rays rise from the horizon, 30ms apart, starting at the centre ray and working outwards. Each one scales from 0 to 1 on the axis of its own line, from its inner end, over 400ms.
4. The wordmark fades in (300ms).
5. The panel lifts away upwards (700ms, panel curve).
6. Underneath, the hero photo has already started settling from scale 1.08 to 1 over 2.4s.
7. The headline lines rise out of overflow-hidden masks, 90ms apart (SplitText by lines). The subline, buttons, line under the buttons and nav then fade up 12px, 60ms apart.
8. The page must be usable within 1.6s of first paint. Clicks are never blocked once the panel has started lifting.

Return visits in the same session skip steps 1–5 and keep steps 6–7.

In `solstice-logo-reversed.svg`, the first `<g>` holds the 13 ray `<line>`s, ordered from the rightmost ray (12°) to the leftmost (168°). Next comes the horizon `<line>`, then two `<path>`s: "Solstice" and "CONSTRUCTION". Inline the SVG as a React component so each part can be animated.

## Hero photos

- Three photos, each shown for 6s, with a 1.5s crossfade.
- While a photo is showing it drifts slowly from scale 1 to 1.06.
- Pause the cycle when the tab is hidden (`visibilitychange`).
- Preload the first photo with `priority`. Load the others after the intro finishes.

## Page transitions

Internal links use a shared `TransitionLink` component.

1. **Cover:** an `--ink` panel slides up from the bottom to cover the screen (450ms, panel curve).
2. Navigate with `router.push`.
3. **Reveal:** once the new pathname is in place, the panel carries on upward and off the top (450ms). The new page's H1 rises the same way the hero headline does.

On browser back and forward, play the reveal half only. The cover can't run before the browser has already navigated. Links to the same page, external links and `mailto:`/`tel:` links skip the transition.

## Small things

- Buttons: the fill sweeps in from the left on hover (300ms).
- Text links: the underline draws left to right (250ms).
- Figures: the numeric values count up once, over 1.2s (Site A: when the intro finishes; Site B: when the figures are half in view).
- Nav links: on hover, a 2px `--amber` tick slides in under the link.

## Site B scroll motion

- Lenis smoothing, synced to ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`, with Lenis driven from `gsap.ticker`).
- The hero photo moves at 0.85× scroll speed. As the trust section arrives, the headline lifts 40px and fades to 0.
- Trust content rises 24px into place, 80ms apart, when each group reaches 80% of the viewport height.
- The thin offset frames around the two photos draw their lines when the pair comes into view (600ms).
- The scroll cue: a 40px vertical `--limestone` line at 40% opacity, with a 10px `--amber` tick travelling down it every 2s. It fades out on first scroll.

## Reduced motion

When `prefers-reduced-motion: reduce` is set:

- No intro panel.
- No scale, drift or parallax.
- The hero holds its first photo with no crossfade.
- Every reveal becomes a 200ms opacity fade.
- Page transitions become a 150ms fade.
- No smooth scrolling.
- Figures show their final values straight away.
