"use client";

import { track } from "@vercel/analytics";
import TransitionLink from "./TransitionLink";
import { UNDERLINE } from "@/lib/underline";

export default function PortfolioButton({ className = "" }: { className?: string }) {
  return (
    <TransitionLink
      href="/portfolio"
      data-portfolio-button
      onClick={() => track("cta_view_portfolio_clicked")}
      className={`group inline-flex items-center py-2 font-body text-xs uppercase tracking-[0.25em] text-ink ${className}`}
    >
      <span className="relative pb-1">
        View Portfolio
        <span className={UNDERLINE} />
      </span>
    </TransitionLink>
  );
}
