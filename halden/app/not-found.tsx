import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-limewash px-3 text-center">
      <p className="font-display text-title font-light">No such room.</p>
      <Link
        href="/the-house"
        className="pt-6 text-micro uppercase tracking-label text-brass underline-offset-4 hover:underline"
      >
        The House
      </Link>
    </main>
  );
}
