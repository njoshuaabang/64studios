/**
 * The particulars, as they would be set on a printed specification page.
 *
 * Held here rather than in the page so the figures have one home: the
 * SingleFamilyResidence JSON-LD reads the same values, and a table that
 * disagrees with its own structured data is worse than no structured data.
 *
 * Measurements carry non-breaking spaces between figure and unit so a
 * narrow column can never leave "5,240" on one line and "sq ft" on the next.
 */
export const particulars: { label: string; value: string }[] = [
  { label: "Accommodation", value: "5,240\u00A0sq\u00A0ft / 486.8\u00A0sq\u00A0m" },
  { label: "Bedrooms", value: "Six, including principal suite" },
  { label: "Bathrooms", value: "Five, and a cloakroom" },
  { label: "Reception rooms", value: "Four" },
  { label: "Outside", value: "Walled garden, 640\u00A0sq\u00A0ft" },
  { label: "Tenure", value: "Freehold" },
  { label: "Local authority", value: "City of Westminster" },
  { label: "Council tax", value: "Band\u00A0H" },
  { label: "EPC", value: "D" },
  { label: "Listing", value: "Grade\u00A0II" },
  { label: "Restoration", value: "Completed 2026" },
  { label: "Architect", value: "Lockhart Sneddon" },
];

/** Separated from the rest of the list, and the only figure anyone looks for. */
export const guidePrice = { label: "Guide price", value: "£9,750,000" };

/** The numeric form, for the Offer in the JSON-LD. */
export const guidePriceValue = 9750000;
