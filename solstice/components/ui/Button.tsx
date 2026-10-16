import type { MouseEventHandler } from "react";
import { TransitionLink } from "../transition/TransitionLink";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  /** nav: the ghost button drawn 40px tall inside a 44px tap area. */
  size?: "default" | "nav";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const face =
  "relative flex w-full items-center justify-center overflow-hidden rounded-[2px] px-6 text-label uppercase whitespace-nowrap " +
  // The fill sweeps in from the left (300ms); the text colour snaps halfway rather than animating.
  "before:absolute before:inset-0 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-reveal group-hover:before:scale-x-100 " +
  "transition-[color,border-color] duration-0 group-hover:delay-150";

const variants = {
  primary: "bg-limestone text-ink before:bg-ink group-hover:text-limestone",
  ghost: "text-limestone border border-limestone/60 group-hover:border-limestone group-hover:delay-0 before:bg-limestone/10",
};

export function Button({ href, children, variant = "primary", size = "default", className = "", onClick }: Props) {
  return (
    <TransitionLink
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center rounded-[2px] ${size === "nav" ? "h-11" : "h-12"} ${className}`}
    >
      <span className={`${face} ${variants[variant]} ${size === "nav" ? "h-10" : "h-12"}`}>
        <span className="relative">{children}</span>
      </span>
    </TransitionLink>
  );
}
