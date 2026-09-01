import type { Config } from "tailwindcss";

/**
 * The palette is closed on purpose: replacing `theme.colors` wholesale (rather
 * than extending it) removes Tailwind's greys, so pure black and white are not
 * reachable from a utility class. Same reasoning for `fontSize` — the scale
 * stops at 40px, so no heading can outgrow the wordmark by accident.
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
      ink: "#1C1C1A",
      limewash: "#F2EFE9",
      green: "#22302A",
      brass: "#9A7B4F",
    },
    fontFamily: {
      display: ["var(--font-display)", "Georgia", "serif"],
      body: ["var(--font-body)", "system-ui", "sans-serif"],
    },
    fontSize: {
      // Two steps below `micro`, added for the nav.
      nano: ["9px", { lineHeight: "1.4" }],
      tiny: ["10px", { lineHeight: "1.4" }],
      // Letter-spaced labels: MARYLEBONE, form labels, room eyebrows.
      micro: ["11px", { lineHeight: "1.4" }],
      label: ["12px", { lineHeight: "1.5" }],
      small: ["13px", { lineHeight: "1.6" }],
      // Margin notes beside the plates on /the-house.
      note: ["15px", { lineHeight: "1.7" }],
      // Body sits at 16–17px with generous leading.
      base: ["17px", { lineHeight: "1.75" }],
      lead: ["19px", { lineHeight: "1.7" }],
      title: ["24px", { lineHeight: "1.35" }],
      display: ["32px", { lineHeight: "1.25" }],
      // Ceiling for every heading on the site.
      hero: ["40px", { lineHeight: "1.2" }],
    },
    // 8px scale, indexed by step: 1 = 8px, 2 = 16px, and so on.
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
      maxWidth: {
        content: "1280px",
        prose: "560px",
      },
      letterSpacing: {
        wordmark: "0.35em",
        label: "0.22em",
        nav: "0.12em",
      },
      transitionDuration: {
        300: "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
