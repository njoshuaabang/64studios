import type { Config } from "tailwindcss";

/**
 * Three brands, one app. 64 Studios owns the unprefixed tokens; the two case
 * studies of other brands own a namespace each — Halden, served at /halden,
 * under `halden-`, and Nash Calloway Design, served at /nash-calloway, under
 * `nash-`. Replacing `theme.colors` wholesale (rather than extending) still
 * keeps Tailwind's greys, and pure black and white, out of reach of all three.
 *
 * The prefix is the boundary. Nothing stops a 64 page writing `text-halden-ink`
 * the way a separate Tailwind config once did, so keep to your own namespace.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      // 64 Studios
      background: "#FDFCFB",
      ink: "#454545",
      bone: "#E3E0D4",

      // Halden
      "halden-ink": "#1C1C1A",
      "halden-limewash": "#F2EFE9",
      "halden-green": "#22302A",
      "halden-brass": "#9A7B4F",
      // The same brass scaled to 84% — same hue, enough darker to carry small
      // text. Brass at 11px on limewash is 3.44:1 against the 4.5 AA wants;
      // this is 4.63:1, so a brass control can stay brass and still be read.
      "halden-brass-deep": "#816742",

      // Nash Calloway Design — six tokens, no black, no white
      "nash-walnut": "#5C4530",
      "nash-terracotta": "#C1603C",
      "nash-plaster": "#F1E9DD",
      "nash-olive": "#6B6E45",
      "nash-brass": "#A9772F",
      "nash-ink": "#2A2622",

    },
    fontFamily: {
      display: ["var(--font-display)", "system-ui", "sans-serif"],
      body: ["var(--font-body)", "system-ui", "sans-serif"],
      "halden-display": ["var(--font-halden-display)", "Georgia", "serif"],
      "halden-body": ["var(--font-halden-body)", "system-ui", "sans-serif"],
      "nash-display": ["var(--font-nash-display)", "system-ui", "sans-serif"],
      "nash-body": ["var(--font-nash-body)", "system-ui", "sans-serif"],
    },
    spacing: {
      0: "0px",
      1: "8px",
      2: "16px",
      3: "24px",
      4: "32px",
      5: "40px",
      6: "48px",
      7: "56px",
      8: "64px",
      9: "72px",
      10: "80px",
      12: "96px",
      14: "112px",
      16: "128px",
      20: "160px",
      24: "192px",
      28: "224px",
      32: "256px",
      px: "1px",
    },
    extend: {
      /**
       * Halden's closed type scale, prefixed. It stops at 40px so no heading can
       * outgrow the wordmark by accident. 64 Studios keeps Tailwind's default
       * scale, which is why these cannot be left unprefixed — `base` in
       * particular would silently retune every 64 page.
       */
      fontSize: {
        "halden-nano": ["9px", { lineHeight: "1.4" }],
        "halden-tiny": ["10px", { lineHeight: "1.4" }],
        "halden-micro": ["11px", { lineHeight: "1.4" }],
        "halden-label": ["12px", { lineHeight: "1.5" }],
        "halden-small": ["13px", { lineHeight: "1.6" }],
        "halden-note": ["15px", { lineHeight: "1.7" }],
        "halden-base": ["17px", { lineHeight: "1.75" }],
        "halden-lead": ["19px", { lineHeight: "1.7" }],
        "halden-title": ["24px", { lineHeight: "1.35" }],
        "halden-display": ["32px", { lineHeight: "1.25" }],
        "halden-hero": ["40px", { lineHeight: "1.2" }],

        /* Serif body copy runs looser than sans, per the tokens. */
      },
      maxWidth: {
        "halden-content": "1280px",
        "halden-prose": "680px",
        /* The tokens cap content at ~1180px; reading columns are set in
           `ch` on the elements themselves, since they follow the face. */
      },
      letterSpacing: {
        "halden-wordmark": "0.35em",
        "halden-label": "0.22em",
        "halden-nav": "0.12em",
      },
      transitionDuration: {
        300: "300ms",
        400: "400ms",
        600: "600ms",
      },
    },
  },
  plugins: [],
};

export default config;
