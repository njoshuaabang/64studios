/**
 * Halden is reachable two ways: as a section of the main domain at /halden, and
 * at the root of its own subdomain. Two helpers, and the difference between
 * them matters more than it looks:
 *
 * `haldenPath` builds a route. Routes move with the host — on the subdomain the
 * prefix is stripped from the URL, so links must be built from the base that
 * `haldenBase()` (server) or `useHaldenBase()` (client) resolves per request.
 *
 * `asset` builds a URL for a real file in `public/halden/`. Those do not move:
 * the file is at /halden/images/… whichever hostname asked for it, and the
 * middleware matcher skips extensions precisely so they are served untouched.
 * Making this host-aware alongside `haldenPath` — the obvious move when copying
 * the pattern — would 404 every image on the subdomain.
 */
export const HALDEN_BASE = "/halden";

/** A Halden route. `base` is "" on the subdomain, HALDEN_BASE on the main domain. */
export function haldenPath(base: string, path = ""): string {
  return `${base}${path}` || "/";
}

/** A file in `public/halden/`. Always prefixed, on every host. */
export function asset(path: string): string {
  return `${HALDEN_BASE}${path}`;
}
