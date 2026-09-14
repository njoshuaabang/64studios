import Link from "next/link";
import { display, body } from "@/lib/fonts";
import { UNDERLINE } from "@/lib/underline";

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
      id="main-content"
      tabIndex={-1}
      className={`${display.variable} ${body.variable} flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-center`}
    >
      {/* Every page carries one, this one included: a document with no
          heading gives a screen reader nothing to land on. */}
      <h1 className="font-display text-2xl font-semibold text-ink">Not found</h1>
      <p className="mt-4 max-w-[42ch] font-body text-base leading-relaxed text-ink">
        This page has moved or never existed. Have a look at the work instead.
      </p>
      <Link
        href="/portfolio"
        className="group mt-8 font-body text-xs uppercase tracking-[0.25em] text-ink"
      >
        <span className="relative pb-1">
          See the work
          <span className={UNDERLINE} />
        </span>
      </Link>
    </main>
  );
}
