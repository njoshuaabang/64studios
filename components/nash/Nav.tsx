import Link from "next/link";
import { nashPath } from "@/lib/nash/paths";
import { nashBase } from "@/lib/nash/server";

const sections = [
  { path: "/portfolio", label: "Portfolio" },
  { path: "/about", label: "About" },
  { path: "/enquire", label: "Enquire" },
];

/**
 * Minimal chrome: the wordmark, and three words straight into the work.
 *
 * Wraps rather than overflowing — below roughly 340px the wordmark and the
 * three links cannot share a line, so the list drops beneath it whole.
 */
export default async function Nav({ transparent = false }: { transparent?: boolean }) {
  const base = await nashBase();
  const links = sections.map(({ path, label }) => ({ href: nashPath(base, path), label }));
  const tone = transparent ? "text-nash-plaster" : "text-nash-walnut";

  return (
    <header data-nash-chrome className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-4 md:px-8 ${tone}`}>
      <Link
        href={nashPath(base)}
        data-nash-wordmark
        className="inline-block whitespace-nowrap py-2 font-nash-display text-sm font-medium md:text-lg"
      >
        Nash Calloway Design
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-baseline gap-3 md:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`inline-block whitespace-nowrap py-2 font-nash-body text-xs transition-colors duration-200 md:text-sm ${
                  transparent ? "hover:text-white" : "hover:text-nash-brass"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
