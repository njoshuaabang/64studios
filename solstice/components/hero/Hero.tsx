"use client";

import Image from "next/image";
import { useRef } from "react";
import type { PhotoSlot } from "@/lib/photos";
import { gsap, reducedMotion, useGSAP } from "@/lib/motion";
import { useIntroPhase } from "../intro/Intro";

const SHOW = 6; // seconds each photo holds
const FADE = 1.5; // crossfade
const DRIFT = 1.06;

function Layer({ photo, first }: { photo: PhotoSlot; first: boolean }) {
  return photo.exists ? (
    <Image
      data-hero-img
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="100vw"
      preload={first}
      loading={first ? "eager" : undefined}
      className="object-cover"
      style={{ objectPosition: photo.position }}
    />
  ) : (
    // Labelled Concrete placeholder until the slot's file is added (images.md).
    <div data-hero-img role="img" aria-label={photo.alt} className="absolute inset-0 bg-concrete">
      <span className="absolute top-28 right-gutter hidden text-small text-ink md:block">{photo.missingLabel}</span>
    </div>
  );
}

type Props = {
  photos: PhotoSlot[];
  children: React.ReactNode;
  className?: string;
};

/** Full-bleed photo crossfade with the amber grade and the Ink scrim; children sit on top. */
export function Hero({ photos, children, className = "" }: Props) {
  const scope = useRef<HTMLElement>(null);
  const loadRest = useIntroPhase() === "done" && !reducedMotion();
  const shown = loadRest ? photos : photos.slice(0, 1);

  // The first photo settles from 1.08 while the intro plays.
  useGSAP(
    () => {
      if (!reducedMotion()) gsap.from("[data-hero-stage]", { scale: 1.08, duration: 2.4, ease: "reveal" });
    },
    { scope },
  );

  // Crossfade loop: each photo holds SHOW seconds, drifts 1 → 1.06, then the next fades in over FADE.
  useGSAP(
    () => {
      if (!loadRest || photos.length < 2) return;
      const layers = gsap.utils.toArray<HTMLElement>("[data-hero-layer]", scope.current);
      const imgs = layers.map((l) => l.querySelector("[data-hero-img]"));
      const period = SHOW + FADE;
      const drift = (t: number) => (1 + (DRIFT - 1) * t) as number;
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      gsap.set(layers.slice(1), { opacity: 0 });

      // Photo 0 is the base layer; it continues the drift it started during the last fade-out.
      tl.fromTo(imgs[0], { scale: drift(FADE / (period + FADE)) }, { scale: DRIFT, duration: period }, 0);
      for (let k = 1; k < layers.length; k++) {
        const at = k * period - FADE;
        tl.fromTo(imgs[k], { scale: 1 }, { scale: DRIFT, duration: period + FADE }, at);
        tl.to(layers[k], { opacity: 1, duration: FADE, ease: "sine.inOut" }, at);
        if (k > 1) tl.set(layers[k - 1], { opacity: 0 }, at + FADE);
      }
      // Last photo fades out to reveal photo 0, which restarts its drift.
      const end = layers.length * period;
      tl.to(layers.at(-1)!, { opacity: 0, duration: FADE, ease: "sine.inOut" }, end - FADE);
      tl.fromTo(imgs[0], { scale: 1 }, { scale: drift(FADE / (period + FADE)), duration: FADE }, end - FADE);

      const onVisibility = () => (document.hidden ? tl.pause() : tl.resume());
      document.addEventListener("visibilitychange", onVisibility);
      return () => document.removeEventListener("visibilitychange", onVisibility);
    },
    { scope, dependencies: [loadRest, photos.length] },
  );

  return (
    <section ref={scope} className={`relative isolate overflow-hidden bg-ink ${className}`}>
      <div data-hero-stage className="absolute inset-0 -z-10">
        {shown.map((photo, i) => (
          <div key={photo.slot} data-hero-layer className="absolute inset-0 overflow-hidden">
            <Layer photo={photo} first={i === 0} />
          </div>
        ))}
        <div className="absolute inset-0 bg-(--grade) mix-blend-soft-light" />
        <div className="absolute inset-0 bg-(--scrim)" />
      </div>
      {children}
    </section>
  );
}
