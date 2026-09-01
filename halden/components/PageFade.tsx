"use client";

import { usePathname } from "next/navigation";

/**
 * The whole of the site's page transition: 300ms, opacity only. Re-keying on
 * the pathname also remounts the page, which re-arms the scroll reveals.
 */
export default function PageFade({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div key={pathname} className={`page-fade ${className ?? ""}`}>
      {children}
    </div>
  );
}
