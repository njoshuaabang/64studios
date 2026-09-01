import Link from "next/link";

/**
 * The global 404 renders under the root layout only — outside both brand
 * groups — so it uses a plain link rather than 64's TransitionLink, which
 * needs the PageTransition provider from app/(64)/layout.tsx.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-center">
      <p className="font-display text-2xl font-semibold text-ink">Nothing here.</p>
      <Link
        href="/"
        className="mt-6 font-body text-xs uppercase tracking-[0.25em] text-ink underline underline-offset-4"
      >
        Return
      </Link>
    </main>
  );
}
