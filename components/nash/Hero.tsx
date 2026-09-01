"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HOLD = 5.5; // seconds a frame is still
const FADE = 1.5; // seconds of crossfade

/**
 * The site's only motion. Frames hold, then cross-dissolve — no slide, no
 * scale, no Ken Burns. The wordmark and positioning line sit above it and
 * never animate.
 *
 * Under reduced motion the timeline is never built: the first frame is already
 * opaque in the markup, so the hero is simply a still image.
 */
export default function Hero({ frames }: { frames: { src: string; alt: string }[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const slides = gsap.utils.toArray<HTMLElement>("[data-frame]", root);
    if (slides.length < 2) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      slides.forEach((_, i) => {
        const next = slides[(i + 1) % slides.length];
        tl.set(next, { zIndex: 1 }, ">")
          .to(next, { opacity: 1, duration: FADE, ease: "none" }, `+=${HOLD}`)
          .set(slides[i], { opacity: 0 })
          .set(next, { zIndex: 0 });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-nash-walnut">
      {frames.map((frame, i) => (
        <div
          key={frame.src}
          data-frame
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <Image
            src={frame.src}
            alt={i === 0 ? frame.alt : ""}
            aria-hidden={i === 0 ? undefined : true}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      {/*
        Enough walnut to carry plaster type over daylight, and no more. A
        gradient rather than a flat scrim: the frames stay bright through the
        middle, and the weight sits where the nav and the line actually are.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-nash-walnut/55 via-nash-walnut/20 to-nash-walnut/80"
      />
    </div>
  );
}
