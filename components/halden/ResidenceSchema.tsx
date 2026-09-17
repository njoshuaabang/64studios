import { guidePriceValue } from "@/lib/halden/particulars";

/**
 * The house as structured data, rendered on every Halden page.
 *
 * The guide price is read from lib/halden/particulars.ts, the same module the
 * particulars table renders from, so the markup and the page cannot quote
 * different figures for the one number anyone checks. The rest are typed here
 * because schema.org wants them as numbers and codes rather than the prose
 * the table sets — "Six, including principal suite" is right on the page and
 * useless to a parser.
 */
const residence = {
  "@context": "https://schema.org",
  "@type": "SingleFamilyResidence",
  name: "Halden",
  description:
    "A Grade II listed Georgian townhouse at 18 Marylebone, London W1, built in 1794 and restored in 2026.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 Marylebone",
    addressLocality: "London",
    addressRegion: "Greater London",
    postalCode: "W1",
    addressCountry: "GB",
  },
  floorSize: {
    "@type": "QuantitativeValue",
    value: 5240,
    unitCode: "FTK",
    unitText: "square feet",
  },
  numberOfRooms: 10,
  numberOfBedrooms: 6,
  numberOfBathroomsTotal: 6,
  numberOfFullBathrooms: 5,
  yearBuilt: 1794,
  offers: {
    "@type": "Offer",
    price: guidePriceValue,
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    businessFunction: "https://purl.org/goodrelations/v1#Sell",
  },
};

export default function ResidenceSchema() {
  return (
    <script
      type="application/ld+json"
      // The value is a literal object built above, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(residence) }}
    />
  );
}
