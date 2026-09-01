import Image from "next/image";

/**
 * The framing device: every project photograph on the site sits in this, a
 * thin inset rule with consistent padding, the way a drawing sits on a plate.
 * Nothing else on the site frames an image, so it reads as one treatment.
 */
export default function Plate({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 1200px",
  className = "",
  children,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <figure className={`border border-nash-ink/20 p-1 md:p-2 ${className}`}>
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        {children}
      </div>
    </figure>
  );
}
