import Link from "next/link";
import { haldenPath } from "@/lib/halden/paths";
import { haldenBase } from "@/lib/halden/server";

export default async function NotFound() {
  const base = await haldenBase();

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-[100dvh] flex-col items-center justify-center bg-halden-limewash px-3 text-center">
      <p className="font-halden-display text-halden-title font-light">No such room.</p>
      <Link
        href={haldenPath(base, "/the-house")}
        className="pt-6 text-halden-micro uppercase tracking-halden-label text-halden-brass underline-offset-4 hover:underline"
      >
        The House
      </Link>
    </main>
  );
}
