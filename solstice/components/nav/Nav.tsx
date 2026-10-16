"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import { trackEstimate } from "@/lib/analytics";
import { Logo } from "../brand/Logo";
import { TransitionLink } from "../transition/TransitionLink";
import { Button } from "../ui/Button";

const navLink =
  "relative inline-flex h-11 items-center text-label uppercase " +
  // A 2px amber tick slides in under the link on hover.
  "after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-300 after:ease-reveal hover:after:scale-x-100";

/** Logo, Work · Process · About and the estimate button; below 768px, logo plus a full-screen Ink menu. */
export function Nav({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const focusables = () => [toggle.current!, ...panel.current!.querySelectorAll<HTMLElement>("a")];
    focusables()[1]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      // Trap focus between the Menu toggle and the panel's links.
      const list = focusables();
      const i = list.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? list.length - 1 : i - 1) : i === list.length - 1 ? 0 : i + 1;
      e.preventDefault();
      list[next].focus();
    };
    const html = document.documentElement;
    const overflow = html.style.overflow;
    html.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = overflow;
    };
  }, [open]);

  // Close the menu once a link starts the page transition.
  const close = () => setOpen(false);

  return (
    <header className={`relative z-30 ${className}`}>
      <div className="shell flex items-center justify-between py-4 md:py-6">
        <TransitionLink href="/" data-reveal="4" className="-my-2 inline-flex h-11 items-center">
          <Logo className="h-7 w-auto md:h-8" />
        </TransitionLink>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <TransitionLink key={l.href} href={l.href} data-reveal="4" className={navLink}>
              {l.label}
            </TransitionLink>
          ))}
          <span data-reveal="4">
            <Button href={nav.estimate.href} variant="ghost" size="nav" onClick={() => trackEstimate("nav")}>
              {nav.estimate.label}
            </Button>
          </span>
        </nav>

        <button
          ref={toggle}
          type="button"
          data-reveal="4"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="relative z-50 -mr-2 inline-flex h-11 items-center px-2 text-label uppercase md:hidden"
        >
          {nav.menu}
        </button>
      </div>

      <div
        ref={panel}
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink md:hidden"
      >
        <nav className="shell flex h-full flex-col justify-center gap-2">
          {nav.links.map((l) => (
            <TransitionLink key={l.href} href={l.href} onClick={close} className="font-display text-section inline-flex min-h-11 items-center self-start">
              {l.label}
            </TransitionLink>
          ))}
          <Button
            href={nav.estimate.href}
            onClick={() => {
              trackEstimate("nav");
              close();
            }}
            className="mt-6 self-start"
          >
            {nav.estimate.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
