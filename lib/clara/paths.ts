/**
 * Clara Ashdown Design is served as a section of this site, at /clara-ashdown.
 * Both helpers exist so that prefix is written once: `claraPath` for routes,
 * `asset` for anything in `public/clara/`, which `next/image` will not prefix
 * on its own.
 */
export const CLARA_BASE = "/clara-ashdown";

export function claraPath(path = ""): string {
  return `${CLARA_BASE}${path}`;
}

export function asset(path: string): string {
  return `/clara${path}`;
}
