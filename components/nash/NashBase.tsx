"use client";

import { createContext, useContext } from "react";

/**
 * Carries the per-host link base to Nash's client components. Server
 * components read it directly with `nashBase()`; anything below a "use client"
 * boundary cannot, so the layout resolves it once per request and hands it
 * down here rather than each component guessing at the hostname.
 */
const NashBaseContext = createContext("");

export function NashBaseProvider({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <NashBaseContext.Provider value={value}>{children}</NashBaseContext.Provider>;
}

export function useNashBase(): string {
  return useContext(NashBaseContext);
}
