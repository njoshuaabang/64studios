import Link from "next/link";
import { display, body } from "@/lib/fonts";

/**
 * The global 404 renders under the root layout only — outside both brand
 * groups — so it uses a plain link rather than 64's TransitionLink, which
 * needs the PageTransition provider from app/(64)/layout.tsx, and declares
 * its own copy of 64's font variables rather than relying on app/(64)/layout.tsx,
 * which this route sits outside of.
 */
export default function NotFound() {
  return (
    <main
      className={`${display.variable} ${body.variable} flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-center`}
    >
      <p className="max-w-[42ch] font-body text-base leading-relaxed text-ink">
        This page has moved or never existed. Have a look at the work instead.
      </p>
      <Link
        href="/portfolio"
        className="group mt-8 font-body text-xs uppercase tracking-[0.25em] text-ink"
      >
        <span className="relative pb-1">
          View Portfolio
          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-400 ease-out group-hover:scale-x-100" />
        </span>
      </Link>
    </main>
  );
}
