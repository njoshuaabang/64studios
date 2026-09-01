import localFont from "next/font/local";

/**
 * Halden's own faces, kept apart from 64's under their own CSS variables so the
 * two brands can share one app without either reaching the other's type.
 *
 * Zodiak — a high-contrast transitional serif, the right period voice for a
 * house built in 1794. Switzer — a neutral grotesque, body copy and UI only.
 */
export const haldenDisplay = localFont({
  src: [
    { path: "../../fonts/Zodiak-Light.woff2", weight: "300", style: "normal" },
    { path: "../../fonts/Zodiak-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-halden-display",
  display: "swap",
  preload: true,
});

export const haldenBody = localFont({
  src: [
    { path: "../../fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-halden-body",
  display: "swap",
  preload: true,
});
