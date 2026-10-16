# Solstice Construction: scroll test build

Two homepages for Solstice Construction Ltd, built in one Next.js codebase so the shared parts can't drift:

- **Site A**: one screen, no scroll. The proof sits inside the hero.
- **Site B**: the same hero, kept clean, with one trust section below it.

Everything else is identical: photos, headline, copy, motion. That way the result answers one question: does the scroll earn its place?

## How to run it

1. Make an empty folder for the project and unzip this handoff into it, so the folder contains `handoff/`.
2. Optional but worth it: save Solstice's Newbury photos into `handoff/photos-manual/` with the names listed in `reference/images.md`. Use the originals from Solstice if you have them, otherwise save them from Instagram. Any you skip will show a labelled placeholder.
3. Open Claude Code in the project folder and paste **PROMPT-1-foundation-and-site-a.md**. Review Site A in the browser.
4. Paste **PROMPT-2-site-b.md**. Review Site B.
5. Deploy: create two Vercel projects from the same repo. Set `NEXT_PUBLIC_SITE_VARIANT=a` on one and `b` on the other, so each variant has its own link.

## What's in here

| File | What it holds |
| --- | --- |
| `PROMPT-1-foundation-and-site-a.md` | Sets up the project, the shared pieces, and Site A |
| `PROMPT-2-site-b.md` | Adds Site B on top of the same foundation |
| `reference/design-tokens.md` | Colours, type, spacing, layout |
| `reference/content.md` | Every word on both sites, plus alt text |
| `reference/images.md` | Photo slots, sources, filenames, crops |
| `reference/motion.md` | Intro, hero, page transitions, scroll motion |
| `brand/` | The upgraded Solstice logo as outlined SVGs |

## Still open with Solstice

- Original photo files: every copy online is compressed.
- Google reviews: there are none yet. Ask the Newbury family first, and rename the Google listing from "Solstice Carpentry".
- Fixed-price quotes and any guarantee or warranty: confirm before either goes in the copy.
- Area wording: the subline names Salisbury, Amesbury and Wiltshire, but the case study is in Newbury.
