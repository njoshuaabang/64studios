import localFont from "next/font/local";

/**
 * Both families are Fontshare releases, self-hosted as woff2 so the type is not
 * a third-party request on a page whose whole job is a first impression.
 *
 * Zodiak — a high-contrast transitional serif, which is the right period voice
 * for a house built in 1794. Light carries the wordmark; Regular does the
 * headings, where hairlines would get fragile below 40px.
 */
export const display = localFont({
  src: [
    { path: "../fonts/Zodiak-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Zodiak-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

/** Switzer — a neutral grotesque, kept to body copy and UI. */
export const body = localFont({
  src: [
    { path: "../fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  preload: true,
});
