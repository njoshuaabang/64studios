/**
 * Nash Calloway Design is served as a section of this site, at /nash-calloway.
 * The prefix is written once here so routes and links stay in step.
 */
export const NASH_BASE = "/nash-calloway";

export function nashPath(path = ""): string {
  return `${NASH_BASE}${path}`;
}
