"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Wordmark from "./Wordmark";
import { prefersReducedMotion } from "@/lib/motion";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { asset } from "@/lib/basePath";

export default function Threshold() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("threshold-lock");
    document.body.classList.add("threshold-lock");
    return () => {
      document.documentElement.classList.remove("threshold-lock");
      document.body.classList.remove("threshold-lock");
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    let onVisible: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const image = root.querySelector<HTMLElement>("[data-threshold-image]");
      const text = gsap.utils.toArray<HTMLElement>("[data-threshold-step]", root);

      gsap.set(image, { opacity: 0 });
      gsap.set(text, { opacity: 0, y: 16 });

      // Arrives, settles, and then holds. Nothing on this page moves again.
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, paused: true });

      tl.to(image, { opacity: 1, duration: 1.4 })
        .to(text[0], { opacity: 1, y: 0, duration: 1.2 }, 0.6)
        .to(text[1], { opacity: 1, y: 0, duration: 1 }, "-=0.75")
        .to(text[2], { opacity: 1, y: 0, duration: 1 }, "-=0.75")
        .to(text[3], { opacity: 1, y: 0, duration: 1 }, "-=0.75");

      // Opened in a background tab, the frame loop is throttled and the
      // entrance would strand itself half-played on a near-black screen. Hold
      // it until someone is actually looking at the page.
      if (document.visibilityState === "visible") {
        tl.play();
      } else {
        onVisible = () => {
          if (document.visibilityState !== "visible") return;
          document.removeEventListener("visibilitychange", onVisible!);
          onVisible = undefined;
          tl.play();
        };
        document.addEventListener("visibilitychange", onVisible);
      }
    }, root);

    return () => {
      if (onVisible) document.removeEventListener("visibilitychange", onVisible);
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-ink"
    >
      <div data-threshold-image className="absolute inset-0">
        <Image
          src={asset("/images/threshold.jpg")}
          alt="The front of the house on a Marylebone street: a black Georgian door numbered 18, set in pale stone between tall sash windows behind iron railings."
          fill
          priority
          quality={82}
          sizes="100vw"
          className="object-cover"
        />
        {/* Enough ink to carry limewash type over pale stone, and no more. */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-3 text-center text-limewash">
        <div data-threshold-step>
          <Wordmark as="h1" size="threshold" />
        </div>

        <p
          data-threshold-step
          className="pt-5 text-micro uppercase tracking-label"
        >
          Marylebone, London
        </p>

        <p data-threshold-step className="pt-8 font-display text-lead font-light">
          A private members’ club in a Georgian townhouse, a few streets from
          Marylebone High Street.
        </p>

        <div data-threshold-step className="pt-10">
          <Link
            href="/the-house"
            className="inline-block border-b border-brass px-1 pb-1 text-micro uppercase tracking-label text-limewash transition-colors duration-300 hover:border-limewash focus-visible:bg-ink"
          >
            Enter
          </Link>
        </div>
      </div>
    </main>
  );
}
