/**
 * The app is served under a path prefix so it can be rewritten onto another
 * domain at /halden. `basePath` in next.config handles routing, `next/link`
 * and the `_next` assets on its own — but *not* `next/image` src values or
 * anything else pointing at `public/`, which is what `asset()` is for.
 *
 * Single source of truth: next.config.ts imports this too.
 */
export const basePath = "/halden";

/** Prefix a path in `public/` so it resolves under the base path. */
export function asset(path: string): string {
  return `${basePath}${path}`;
}
