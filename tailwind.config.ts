import type { Config } from "tailwindcss";

/**
 * Three brands, one app. 64 Studios owns the unprefixed tokens; the two case
 * studies of other brands own a namespace each — Halden, served at /halden,
 * under `halden-`, and Clara Ashdown Design, served at /clara-ashdown, under
 * `clara-`. Replacing `theme.colors` wholesale (rather than extending) still
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

      // Clara Ashdown Design
      "clara-chalk": "#F3F0E8",
      "clara-ink": "#2B2822",
      "clara-stone": "#B9A98C",
      "clara-sage": "#6E7259",
      "clara-brass": "#93703E",
    },
    fontFamily: {
      display: ["var(--font-display)", "system-ui", "sans-serif"],
      body: ["var(--font-body)", "system-ui", "sans-serif"],
      "halden-display": ["var(--font-halden-display)", "Georgia", "serif"],
      "halden-body": ["var(--font-halden-body)", "system-ui", "sans-serif"],
      "clara-display": ["var(--font-clara-display)", "Georgia", "serif"],
      "clara-body": ["var(--font-clara-body)", "system-ui", "sans-serif"],
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

        /* Clara Ashdown. Prefixed for the same reason Halden's is: `base`
           and the rest would otherwise retune every 64 Studios page. */
        "clara-micro": ["12px", { lineHeight: "1.5" }],
        "clara-meta": ["13px", { lineHeight: "1.6" }],
        "clara-sub": ["13.5px", { lineHeight: "1.6" }],
        "clara-nav": ["14px", { lineHeight: "1.5" }],
        "clara-base": ["16px", { lineHeight: "1.7" }],
        /* Serif body copy runs looser than sans, per the tokens. */
        "clara-prose": ["19px", { lineHeight: "1.68" }],
        "clara-lead": ["23px", { lineHeight: "1.65" }],
        "clara-title": ["30px", { lineHeight: "1.25" }],
        "clara-dropcap": ["76px", { lineHeight: "0.8" }],
      },
      maxWidth: {
        "halden-content": "1280px",
        "halden-prose": "680px",
        /* The tokens cap content at ~1180px; reading columns are set in
           `ch` on the elements themselves, since they follow the face. */
        "clara-content": "1180px",
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
