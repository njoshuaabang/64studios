/**
 * Nash Calloway Design is reachable two ways: as a section of the main domain
 * at /nash-calloway, and at the root of its own subdomain. The base differs
 * per host, so it is passed in rather than baked in here — server components
 * read it with `nashBase()` from ./server, client components with
 * `useNashBase()`. This module stays free of `next/headers` so it can be
 * imported from either side.
 */
export const NASH_BASE = "/nash-calloway";

/** A Nash link. `base` is "" on the subdomain, NASH_BASE on the main domain. */
export function nashPath(base: string, path = ""): string {
  return `${base}${path}` || "/";
}
