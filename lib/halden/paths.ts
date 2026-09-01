/**
 * Halden is served as a section of this site, at /halden. Both helpers exist so
 * that prefix is written once: `haldenPath` for routes, `asset` for anything in
 * `public/halden/`, which `next/image` will not prefix on its own.
 */
export const HALDEN_BASE = "/halden";

export function haldenPath(path = ""): string {
  return `${HALDEN_BASE}${path}`;
}

export function asset(path: string): string {
  return `${HALDEN_BASE}${path}`;
}
