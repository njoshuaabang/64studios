import { Fraunces, Inter } from "next/font/google";

/**
 * Clara's two faces, kept apart from the other brands' under their own CSS
 * variables. Two families total, and the tokens forbid a third.
 *
 * Both are variable fonts, so neither declares a `weight`: the whole axis
 * ships in one file and the tokens' ranges — 300–500 of the serif, 400–500
 * of the sans — are held by the utilities that use them, not by the loader.
 *
 * Fraunces carries `opsz` as well as weight, which is the whole reason it is
 * here: the wordmark at 64px and a drop cap at 76px want a different cut of
 * the same face than a 23px paragraph does, and optical sizing gives that.
 * Italic is loaded because the positioning line and the colophon mark use it.
 */
export const claraDisplay = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-clara-display",
  display: "swap",
  preload: true,
});

/** Inter — body copy, nav, meta lines and form labels. Weights 400 and 500. */
export const claraBody = Inter({
  subsets: ["latin"],
  variable: "--font-clara-body",
  display: "swap",
  preload: true,
});
