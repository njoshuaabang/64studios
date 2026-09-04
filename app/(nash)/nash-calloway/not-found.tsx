import Link from "next/link";
import { nashPath } from "@/lib/nash/paths";
import { nashBase } from "@/lib/nash/server";

export default async function NotFound() {
  const base = await nashBase();

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-[100dvh] flex-col items-center justify-center bg-nash-plaster px-3 text-center">
      <p className="font-nash-display text-3xl text-nash-ink md:text-4xl">Not on the plan.</p>
      <Link
        href={nashPath(base, "/portfolio")}
        className="mt-6 font-nash-body text-sm uppercase tracking-wide text-nash-brass hover:underline"
      >
        Portfolio
      </Link>
    </main>
  );
}
