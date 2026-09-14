import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The shared builder behind every generated Open Graph image. One template on
 * every route, rather than each route re-declaring the lockup, the fonts and
 * the margin.
 *
 * The layout is fixed: the ground, the wordmark at top left inside an 8%
 * margin, and one line of ink beneath it. Every page but a journal entry
 * carries the positioning line, so a link to the site says the same thing
 * wherever it is posted. An entry carries its own title instead, because a
 * link to a piece of writing should say which piece.
 *
 * ImageResponse (Satori) only reads ttf, otf or woff — not woff2, which is
 * the only format the site's own General Sans files exist in. These two ttf
 * files are a one-time offline conversion of the existing woff2 assets (via
 * fontTools, already installed, no new project dependency), committed
 * alongside them for this one purpose.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_LINE = "Websites for the people behind fine homes.";

const INK = "#454545";
const BONE = "#E3E0D4";
const GROUND = "#FDFCFB";

// 8% of each axis of the 1200x630 frame.
const MARGIN_X = 96;
const MARGIN_Y = 50;

async function loadFonts() {
  const [bold, semibold] = await Promise.all([
    readFile(join(process.cwd(), "fonts/GeneralSans-Bold.ttf")),
    readFile(join(process.cwd(), "fonts/GeneralSans-Semibold.ttf")),
  ]);
  return [
    { name: "General Sans", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "General Sans", data: semibold, weight: 600 as const, style: "normal" as const },
  ];
}

/**
 * Splits a line across two at the word break nearest its middle.
 *
 * Satori does not implement text-wrap: balance, so a line left to wrap on its
 * own gives the second one orphaned word. This is that property done by hand:
 * every break point is scored by how far it leaves the two halves from even,
 * and the closest wins. A line short enough for one is left on one.
 */
function balance(text: string, charsPerLine: number): string[] {
  if (text.length <= charsPerLine) return [text];

  const words = text.split(" ");
  let best = { at: 1, gap: Infinity };
  for (let at = 1; at < words.length; at += 1) {
    const first = words.slice(0, at).join(" ").length;
    const second = words.slice(at).join(" ").length;
    const gap = Math.abs(first - second);
    if (gap < best.gap) best = { at, gap };
  }
  return [words.slice(0, best.at).join(" "), words.slice(best.at).join(" ")];
}

/**
 * `title` is a journal entry's own title. Left out, the card carries the
 * studio's positioning line, which is what every other route wants.
 */
export async function renderOgImage(title?: string) {
  const fonts = await loadFonts();
  const lines = balance(title ?? OG_LINE, 34);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: GROUND,
          paddingTop: MARGIN_Y,
          paddingBottom: MARGIN_Y,
          paddingLeft: MARGIN_X,
          paddingRight: MARGIN_X,
        }}
      >
        {/* The wordmark, left-aligned: 64. over a rule over letterspaced
            STUDIOS, holding components/Wordmark.tsx's own proportions rather
            than a fresh guess at them. */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "General Sans",
              fontWeight: 700,
              fontSize: 76,
              lineHeight: 1,
              color: INK,
            }}
          >
            64.
          </div>
          <div style={{ display: "flex", width: 52, height: 1, background: INK, marginTop: 10 }} />
          <div
            style={{
              display: "flex",
              fontFamily: "General Sans",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: "7.5px",
              textTransform: "uppercase",
              color: INK,
              marginTop: 11,
            }}
          >
            Studios
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* A bone hairline the full measure, the one decorative mark on the
              card and the same tone the case-study title block rules with. */}
          <div style={{ display: "flex", width: "100%", height: 1, background: BONE, marginBottom: 28 }} />
          {lines.map((line) => (
            <span
              key={line}
              style={{
                display: "block",
                fontFamily: "General Sans",
                fontWeight: 600,
                fontSize: 54,
                lineHeight: 1.22,
                color: INK,
              }}
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
