// Builds public/photos/ from handoff/reference/images.md:
// handoff/photos-manual/<slot>.jpg wins over the website download of the same slot.
import { existsSync } from "node:fs";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const manualDir = path.join(root, "handoff/photos-manual");
const outDir = path.join(root, "public/photos");
const base = "https://www.solsticeconstruction.co.uk/wp-content/uploads/2025/12/";

const slots = {
  "hero-newbury-kitchen": null, // Instagram only: manual
  "hero-garden-room": "WhatsApp-Image-2025-12-09-at-09.32.53-9.jpeg",
  "hero-walnut-kitchen": "WhatsApp-Image-2025-12-09-at-09.32.53-2-scaled.jpeg",
  "hero-roof-frame-sunset": "WhatsApp-Image-2025-11-30-at-19.40.48.jpeg",
  "newbury-rear": "1-after.jpeg",
  "newbury-frame": null, // Instagram only: manual
};

// Accept any common extension in photos-manual, e.g. hero-newbury-kitchen.jpeg or .png.
const manualFiles = existsSync(manualDir) ? await readdir(manualDir) : [];
const manualFor = (slot) =>
  manualFiles.find((f) => /\.(jpe?g|png|webp|heic|avif)$/i.test(f) && path.parse(f).name === slot);

async function download(file) {
  const res = await fetch(base + file);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return Buffer.from(await res.arrayBuffer());
}

await mkdir(outDir, { recursive: true });
const present = [];
const missing = [];

for (const [slot, remote] of Object.entries(slots)) {
  const manual = manualFor(slot);
  let input;
  let source;
  try {
    if (manual) {
      input = path.join(manualDir, manual);
      source = `photos-manual/${manual}`;
    } else if (remote) {
      input = await download(remote);
      source = `website ${remote}`;
    }
  } catch (err) {
    console.warn(`  ${slot}: download failed (${err.cause?.message ?? err.message})`);
  }
  if (!input) {
    missing.push(slot);
    continue;
  }
  const out = path.join(outDir, `${slot}.jpg`);
  const info = await sharp(input)
    .rotate()
    .resize({ width: 2560, height: 2560, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  present.push(slot);
  console.log(`  ${slot}.jpg  ${info.width}×${info.height}  from ${source}`);
}

console.log(`\nPresent (${present.length}): ${present.join(", ") || "none"}`);
console.log(`Missing (${missing.length}): ${missing.join(", ") || "none"}`);
