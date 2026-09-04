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
 * Each photograph is dimmed 30% by its own brightness filter rather than by a
 * scrim laid over the stack. The filter is applied to each frame's pixels
 * before the crossfade blends them, so two frames mid-dissolve blend to a
 * result that is still exactly 30% down. A per-frame scrim would not behave
 * this way — two of them composite while both images are partly opaque and the
 * hero would pulse darker through every transition.
 *
 * At 30% the chrome clears WCAG AA on one frame of four: measured behind the
 * wordmark, nav and button, the rotation runs 4.58, 2.41, 3.60 and 2.48 to one
 * against the 4.5 body text wants, and the mid-dissolve blends run 3.03 to
 * 4.09. This is a deliberate choice for the photography, not an oversight.
 * Clearing AA on every frame in this set needs roughly a 63% dim.
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
            preload={i === 0}
            sizes="100vw"
            className="object-cover brightness-[0.7]"
          />
        </div>
      ))}
    </div>
  );
}
