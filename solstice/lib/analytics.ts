import { track } from "@vercel/analytics";
import { variant } from "./variant";

export type EstimateLocation = "nav" | "hero" | "trust";

export const trackEstimate = (location: EstimateLocation) => track("estimate_click", { variant, location });
