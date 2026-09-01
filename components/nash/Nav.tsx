import Link from "next/link";
import { nashPath } from "@/lib/nash/paths";

const links = [
  { href: nashPath("/portfolio"), label: "Portfolio" },
  { href: nashPath("/about"), label: "About" },
  { href: nashPath("/enquire"), label: "Enquire" },
];

/** Minimal chrome: the wordmark, and three words straight into the work. */
export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const tone = transparent ? "text-nash-plaster" : "text-nash-walnut";

  return (
    <header className={`flex items-baseline justify-between gap-4 px-4 py-4 md:px-8 ${tone}`}>
      <Link href={nashPath()} className="whitespace-nowrap font-nash-display text-sm font-medium md:text-lg">
        Nash Calloway Design
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-baseline gap-3 md:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`whitespace-nowrap font-nash-body text-xs transition-colors duration-200 md:text-sm ${
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
