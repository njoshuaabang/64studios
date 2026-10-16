"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { EASE_PANEL, gsap, reducedMotion } from "@/lib/motion";

type Navigate = (href: string) => void;
const TransitionContext = createContext<Navigate | null>(null);

export const useTransitionNavigate = () => useContext(TransitionContext);

/**
 * Cover and reveal (motion.md): an Ink panel slides up over the page, the route changes,
 * then the panel carries on off the top. Browser back/forward plays the reveal half only.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const current = useRef(pathname);

  const reveal = useCallback(() => {
    const el = panel.current;
    if (!el) return;
    pending.current = false;
    if (reducedMotion()) {
      gsap.to(el, { opacity: 0, duration: 0.15, onComplete: () => void gsap.set(el, { visibility: "hidden" }) });
      return;
    }
    gsap.to(el, {
      yPercent: -100,
      duration: 0.45,
      ease: EASE_PANEL,
      onComplete: () => void gsap.set(el, { visibility: "hidden", yPercent: 100 }),
    });
  }, []);

  const cover = useCallback((instant: boolean, then?: () => void) => {
    const el = panel.current;
    if (!el) return;
    pending.current = true;
    gsap.killTweensOf(el);
    const reduce = reducedMotion();
    gsap.set(el, { visibility: "visible", yPercent: reduce || instant ? 0 : 100, opacity: reduce && !instant ? 0 : 1 });
    if (instant) return then?.();
    gsap.to(el, reduce ? { opacity: 1, duration: 0.15, onComplete: then } : { yPercent: 0, duration: 0.45, ease: EASE_PANEL, onComplete: then });
  }, []);

  const navigate = useCallback<Navigate>(
    (href) => cover(false, () => router.push(href)),
    [cover, router],
  );

  // New pathname is in place: lift the panel away.
  useEffect(() => {
    current.current = pathname;
    if (pending.current) requestAnimationFrame(reveal);
  }, [pathname, reveal]);

  // Back/forward: the browser has already navigated, so cover instantly and reveal once the route renders.
  useEffect(() => {
    const onPop = () => {
      if (window.location.pathname !== current.current) cover(true);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [cover]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <div
        ref={panel}
        aria-hidden
        className="pointer-events-none invisible fixed inset-0 z-[90] bg-ink"
      />
    </TransitionContext.Provider>
  );
}
