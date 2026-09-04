import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "64 Studios";
export const size = OG_SIZE;
export const contentType = "image/png";

// The threshold line (Phase 7) instead of a label — the one exception to
// every other page's uppercase corner label — split roughly in half rather
// than left to wrap wherever the renderer chooses.
export default function Image() {
  return renderOgImage({ kind: "sentence", lines: ["Most good businesses are", "undersold by their websites."] });
}
