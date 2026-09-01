"use client";

import TransitionLink from "./TransitionLink";

export default function PortfolioButton({ className = "" }: { className?: string }) {
  return (
    <TransitionLink
      href="/portfolio"
      data-portfolio-button
      className={`group inline-flex items-center font-body text-xs uppercase tracking-[0.25em] text-ink ${className}`}
    >
      <span className="relative pb-1">
        View Portfolio
        <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-400 ease-out group-hover:scale-x-100" />
      </span>
    </TransitionLink>
  );
}
