import type { ElementType } from "react";

type WordmarkProps = {
  as?: ElementType;
  size?: "threshold" | "nav";
  className?: string;
};

/**
 * HALDEN, tracked at 0.35em. Letter-spacing is applied after the final letter
 * too, so the negative right margin pulls that trailing space back off — without
 * it the wordmark sits visibly left of centre on the threshold.
 */
export default function Wordmark({
  as: Tag = "span",
  size = "nav",
  className = "",
}: WordmarkProps) {
  const sizing =
    size === "threshold"
      ? "text-[clamp(34px,6.5vw,66px)] font-light"
      : "text-tiny font-normal";

  return (
    <Tag
      className={`block font-display uppercase leading-none tracking-wordmark [margin-right:-0.35em] ${sizing} ${className}`}
    >
      Halden
    </Tag>
  );
}
