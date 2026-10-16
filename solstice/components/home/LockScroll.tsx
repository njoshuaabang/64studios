"use client";

import { useEffect } from "react";

/** overflow: hidden on html and body while this page is shown, and only then. */
export function LockScroll() {
  useEffect(() => {
    const els = [document.documentElement, document.body];
    els.forEach((el) => (el.style.overflow = "hidden"));
    return () => els.forEach((el) => (el.style.overflow = ""));
  }, []);
  return null;
}
