"use client";

import { createContext, useContext } from "react";

/**
 * Carries the per-host route base to Halden's client components. Server
 * components read it directly with `haldenBase()`; anything below a "use
 * client" boundary cannot, so the layout resolves it once per request and hands
 * it down rather than each component guessing at the hostname.
 *
 * Mirrors Nash's NashBase. The brands keep their own copies the way they keep
 * their own tokens and path helpers — nothing here is shared between them, so
 * one can change without the other having to agree.
 */
const HaldenBaseContext = createContext("");

export function HaldenBaseProvider({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <HaldenBaseContext.Provider value={value}>{children}</HaldenBaseContext.Provider>;
}

export function useHaldenBase(): string {
  return useContext(HaldenBaseContext);
}
