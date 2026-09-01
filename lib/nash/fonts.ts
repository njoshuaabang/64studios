import { Space_Grotesk, Inter } from "next/font/google";

/**
 * Nash's two faces, kept apart from the other brands' under their own CSS
 * variables. Two families total, which is what the tokens allow.
 */
export const nashDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-nash-display",
  display: "swap",
  preload: true,
});

export const nashBody = Inter({
  subsets: ["latin"],
  variable: "--font-nash-body",
  display: "swap",
  preload: true,
});
