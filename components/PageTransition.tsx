"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

type TransitionContextValue = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionNavigate() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransitionNavigate must be used within PageTransition");
  }
  return ctx.navigate;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const isFirstRender = useRef(true);
  const router = useRouter();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousPathname.current = pathname;
      return;
    }
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const overlay = overlayRef.current;
    if (!overlay) return;

    if (prefersReducedMotion()) {
      gsap.set(overlay, { autoAlpha: 0 });
      return;
    }

    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [pathname]);

  const navigate = (href: string) => {
    if (href === pathname) return;
    const overlay = overlayRef.current;

    if (!overlay || prefersReducedMotion()) {
      router.push(href);
      return;
    }

    gsap.to(overlay, {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => router.push(href),
    });
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 bg-ink"
        style={{ opacity: 0, visibility: "hidden" }}
      />
      {children}
    </TransitionContext.Provider>
  );
}
