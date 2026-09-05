"use client";

import { track } from "@vercel/analytics";
import { social } from "@/config/social";

/**
 * Split out of SiteFooter only because these need a click handler and the
 * footer does not otherwise need to be a client component.
 *
 * Vercel Analytics counts page views, so a visitor who leaves for Instagram
 * is otherwise indistinguishable from one who closed the tab. The platform
 * is sent as a property rather than baked into the event name, so the three
 * links roll up to one number and still break down by destination.
 */
export default function SocialLinks() {
  return (
    <>
      {social.map((item, i) => (
        <span key={item.href}>
          {i > 0 ? <span aria-hidden="true"> &middot; </span> : null}
          <a
            href={item.href}
            rel="noreferrer"
            target="_blank"
            onClick={() => track("social_link_clicked", { platform: item.label })}
            className="underline decoration-transparent underline-offset-4 transition-colors duration-400 hover:decoration-ink"
          >
            {item.label}
          </a>
        </span>
      ))}
    </>
  );
}
