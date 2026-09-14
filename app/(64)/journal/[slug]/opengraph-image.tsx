import { renderOgImage, OG_SIZE } from "@/lib/og";
import { entries, getEntry } from "@/config/journal";

export const alt = "64 Studios — Websites for the people behind fine homes";
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
  // No entry means the slug is not one of ours; the card falls back to the
  // studio line rather than naming a piece that does not exist.
  if (!entry) return renderOgImage();

  return renderOgImage(entry.title);
}
