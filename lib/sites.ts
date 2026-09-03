import { SITE_URL } from "./site";

/**
 * The case-study sites that 64 Studios hosts, and where each one lives.
 *
 * Each site is reachable two ways: as a section of the main domain
 * (64studios.design/nash-calloway) and on its own subdomain
 * (nash-calloway.64studios.design). Both serve the same route tree — the
 * subdomain is a different door into it, not a second copy — so this table is
 * the only place the mapping is written.
 *
 * `rootServed` says whether a site can be served at the root of its subdomain
 * with the base path stripped from the URL. All three can. The Next route
 * groups always could: their links are generated at render time, so the prefix
 * is simply dropped per host.
 *
 * Aldern & Voss took a change to its own source. It is a Vite SPA, and its
 * router basename used to be compiled in from Vite's `base`, so at the root of
 * a subdomain it looked for a prefix the URL did not have and matched no route.
 * It now derives the basename from the actual pathname at run time, which
 * distinguishes the two mounts that one build serves. Its assets stay absolute
 * at /aldern-voss/… — those files really do live there and resolve on either
 * hostname — so only the router had to learn where it was.
 */
export type Site = {
  /** The label in `<subdomain>.64studios.design`. */
  subdomain: string;
  /** Where the site lives as a path on the main domain. */
  base: string;
  /** Can it be served at the subdomain root with the prefix stripped? */
  rootServed: boolean;
};

export const SITES: Site[] = [
  { subdomain: "nash-calloway", base: "/nash-calloway", rootServed: true },
  { subdomain: "halden", base: "/halden", rootServed: true },
  { subdomain: "aldern-voss", base: "/aldern-voss", rootServed: true },
];

/** The bare hostname, without port, lowercased. Null hosts resolve to null. */
export function normaliseHost(host: string | null | undefined): string | null {
  if (!host) return null;
  return host.split(":")[0].toLowerCase();
}

/**
 * The site a request is for, by hostname. Matches the first label against the
 * table, which means it works for any apex — 64studios.design in production,
 * nash-calloway.localhost in development — without the apex being hardcoded.
 */
export function siteForHost(host: string | null | undefined): Site | null {
  const name = normaliseHost(host);
  if (!name) return null;

  const label = name.split(".")[0];
  return SITES.find((site) => site.subdomain === label) ?? null;
}

/**
 * The base path for links rendered on this host: "" on a site's own subdomain
 * where the prefix is stripped, and the site's path prefix everywhere else.
 * Callers append to it, so "" yields clean root-relative links.
 */
export function basePathForHost(host: string | null | undefined, base: string): string {
  const site = siteForHost(host);
  if (site && site.base === base && site.rootServed) return "";
  return base;
}

/**
 * A link out to 64 Studios itself. On the main domain the two sites share an
 * origin, so a root-relative path is right and stays a client navigation. On a
 * case-study subdomain it is a different origin and has to be absolute, or it
 * would resolve back into the subdomain and 404.
 */
export function studioUrl(host: string | null | undefined, path: string): string {
  return siteForHost(host) ? new URL(path, SITE_URL).toString() : path;
}
