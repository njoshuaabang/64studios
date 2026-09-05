import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "How a Project Runs — 64 Studios";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ kind: "label", text: "How a project runs" });
}
