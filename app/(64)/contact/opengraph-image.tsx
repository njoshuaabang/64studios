import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "64 Studios — Websites for the people behind fine homes";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
