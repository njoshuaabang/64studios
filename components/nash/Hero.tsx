"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HOLD = 5.5; // seconds a frame is still
const FADE = 1.5; // seconds of crossfade

/**
 * The site's only recurring motion. Frames hold, then cross-dissolve — no
 * slide, no scale, no Ken Burns.
 *
 * One flat scrim covers the whole hero, laid over the stack rather than one
 * per frame. That matters during a dissolve: a per-frame scrim would composite
 * two of them while both images are partly opaque and pulse darker through
 * every transition. One layer above the stack holds the same weight throughout.
 *
 * Ink rather than walnut, and flat rather than a gradient. Walnut is a brown
 * and tinted the photography orange over two composited frames; a gradient
 * made the image change brightness as the eye travelled down it. 63% is the
 * figure that clears 4.5:1 on the darkest-needing frame in the rotation,
 * measured behind the actual wordmark, nav and button boxes rather than over
 * the band as a whole — undimmed, those same frames run 1.18 to 2.47 to one.
 *
 * The first transition lands at HOLD seconds, comfortably after the entrance
 * panels have cleared at ~2.6s, so the two never overlap.
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
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-nash-ink">
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
      <div aria-hidden="true" className="absolute inset-0 bg-nash-ink/[0.63]" />
    </div>
  );
}
