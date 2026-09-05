import { renderOgImage, OG_SIZE } from "@/lib/og";
import { entries, getEntry } from "@/config/journal";

export const alt = "64 Studios";
export const size = OG_SIZE;
export const contentType = "image/png";

/**
 * Pre-rendered per entry, from the same list the routes are generated from,
 * so a new entry gets a card without anyone adding one.
 */
export function generateStaticParams() {
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);

  // A slug with no entry never renders a page either, so the card falls back
  // to the section label rather than inventing a title for it.
  if (!entry) return renderOgImage({ kind: "label", text: "Journal" });

  return renderOgImage({ kind: "entry", eyebrow: "Journal", title: entry.title });
}
