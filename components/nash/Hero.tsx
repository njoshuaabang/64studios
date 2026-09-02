import Image from "next/image";

/**
 * A single held frame. This was a crossfading rotation; it is now one still
 * photograph, so the site carries no motion at all and there is nothing for
 * prefers-reduced-motion to switch off.
 *
 * The dim is one constant value rather than a gradient: an even scrim sits the
 * frame at a single weight top to bottom, which is calmer than a photograph
 * that changes brightness as the eye travels down it, and it keeps plaster
 * type above 4.5:1 over the image. Ink, not walnut — walnut is a brown and
 * tinted the photography orange.
 */
export default function Hero({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-nash-ink">
      <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-nash-ink/55" />
    </div>
  );
}
