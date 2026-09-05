import localFont from "next/font/local";

/**
 * Two families, three files. Every weight declared here is one the agency
 * pages actually render — a declared face ships whether or not anything uses
 * it, and next/font preloads all of them on every page.
 *
 * General Sans: 600 for headings, 700 for the wordmark and case-study titles.
 * Satoshi: 400 for all body copy. There is no 500 in either, because nothing
 * on the site is set at 500.
 */
export const display = localFont({
  src: [
    { path: "../fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const body = localFont({
  src: [{ path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-body",
  display: "swap",
  preload: true,
});
