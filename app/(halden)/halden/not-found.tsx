import Link from "next/link";
import { haldenPath } from "@/lib/halden/paths";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-halden-limewash px-3 text-center">
      <p className="font-halden-display text-halden-title font-light">No such room.</p>
      <Link
        href={haldenPath("/the-house")}
        className="pt-6 text-halden-micro uppercase tracking-halden-label text-halden-brass underline-offset-4 hover:underline"
      >
        The House
      </Link>
    </main>
  );
}
