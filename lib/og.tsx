import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The shared builder behind every generated Open Graph image. One function,
 * called with a caption, rather than four near-identical route files each
 * re-declaring the lockup, the fonts and the hairline border.
 *
 * ImageResponse (Satori) only reads ttf, otf or woff — not woff2, which is
 * the only format the site's own General Sans files exist in. These two ttf
 * files are a one-time offline conversion of the existing woff2 assets (via
 * fontTools, already installed, no new project dependency), committed
 * alongside them for this one purpose.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

const INK = "#454545";
const BONE = "#E3E0D4";
const GROUND = "#FDFCFB";

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

type Caption =
  | { kind: "label"; text: string }
  | { kind: "sentence"; lines: [string] | [string, string] }
  | { kind: "entry"; eyebrow: string; title: string };

/**
 * Splits a title across two lines at the word break nearest its middle.
 *
 * Satori does not implement text-wrap: balance, so a title left to wrap on its
 * own gives the second line one orphaned word. This is that property done by
 * hand: every break point is scored by how far it leaves the two halves from
 * even, and the closest wins. A title short enough for one line is left on
 * one line.
 */
function balance(title: string, charsPerLine: number): string[] {
  if (title.length <= charsPerLine) return [title];

  const words = title.split(" ");
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
 * Every card shares the lockup — 64. over a rule over letterspaced STUDIOS,
 * matching components/Wordmark.tsx's own proportions rather than a fresh
 * guess at them — plus a hairline bone border inset 48px from every edge.
 * Only the lower-left caption differs: an uppercase label on every page but
 * the homepage, which gets the threshold line instead, in sentence case, up
 * to two lines.
 */
export async function renderOgImage(caption: Caption) {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: GROUND,
          position: "relative",
        }}
      >
        {/* Satori does not support the `inset` shorthand — needs each side named. */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 48,
            right: 48,
            bottom: 48,
            border: `1px solid ${BONE}`,
            display: "flex",
          }}
        />

        {/* The entry card's caption is a two-line title rather than one short
            label, so it reaches roughly 210px further up the canvas. The
            lockup is centred in what is left above it instead of in the whole
            frame, which is what keeps STUDIOS clear of the eyebrow. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            paddingBottom: caption.kind === "entry" ? 210 : 0,
          }}
        >
          {/* ~30% of the 630px canvas height, optically centred by the flex column around it. */}
          <div style={{ display: "flex", fontFamily: "General Sans", fontWeight: 700, fontSize: 189, lineHeight: 1, color: INK }}>
            64.
          </div>
          <div style={{ display: "flex", width: 96, height: 1, background: INK, marginTop: 16 }} />
          {/* tracking-[0.5em] on a 28px face, matching Wordmark.tsx exactly. */}
          <div
            style={{
              display: "flex",
              fontFamily: "General Sans",
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: "14px",
              textTransform: "uppercase",
              color: INK,
              marginTop: 20,
            }}
          >
            Studios
          </div>
        </div>

        {caption.kind === "entry" ? (
          /* The one card where the caption carries the whole message. A
             journal link posted anywhere should say what the piece is about,
             so the title is set in the display face at a readable thumbnail
             size, with the section as a small eyebrow above it. */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: 80,
              right: 80,
              bottom: 64,
              color: INK,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "General Sans",
                fontWeight: 600,
                fontSize: 20,
                letterSpacing: "2.8px",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {caption.eyebrow}
            </div>
            {balance(caption.title, 46).map((line) => (
              <span
                key={line}
                style={{
                  display: "block",
                  fontFamily: "General Sans",
                  fontWeight: 700,
                  fontSize: 44,
                  lineHeight: 1.25,
                }}
              >
                {line}
              </span>
            ))}
          </div>
        ) : caption.kind === "label" ? (
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: 80,
              bottom: 64,
              fontFamily: "General Sans",
              fontWeight: 600,
              fontSize: 24,
              // 0.14em of 24px.
              letterSpacing: "3.36px",
              textTransform: "uppercase",
              color: INK,
            }}
          >
            {caption.text}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: 80,
              bottom: 64,
              maxWidth: 520,
              fontFamily: "General Sans",
              fontWeight: 600,
              fontSize: 28,
              lineHeight: 1.35,
              color: INK,
            }}
          >
            {caption.lines.map((line) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </div>
        )}
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
