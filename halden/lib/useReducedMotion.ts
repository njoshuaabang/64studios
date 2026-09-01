import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// The server cannot know the preference, so it renders the motion-safe markup
// and the client corrects on hydration.
const getServerSnapshot = () => false;

/**
 * Subscribes to the reduced-motion preference without an effect, so components
 * can read it during render and respond if it changes mid-session.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
