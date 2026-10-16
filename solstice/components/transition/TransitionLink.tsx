"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { useTransitionNavigate } from "./TransitionProvider";

type Props = ComponentProps<typeof Link> & { href: string };

/** Internal link that runs the cover-and-reveal transition. Same-page, external, mailto: and tel: links skip it. */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const navigate = useTransitionNavigate();
  const pathname = usePathname();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !navigate) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!href.startsWith("/") || href.split("#")[0] === pathname) return;
    e.preventDefault();
    navigate(href);
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
