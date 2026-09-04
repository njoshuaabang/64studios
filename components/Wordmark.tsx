type WordmarkProps = {
  size?: "hero" | "compact";
  as?: "h1" | "div";
  className?: string;
};

const SIZES = {
  hero: {
    number: "text-[length:min(32vw,24dvh)] leading-[0.85] sm:text-[length:min(24vw,26dvh)] md:text-[length:min(16rem,30dvh)]",
    rule: "mt-2 h-px w-20 md:w-24",
    studios: "mt-3 text-xs sm:text-sm",
  },
  compact: {
    number: "text-2xl leading-none",
    rule: "mt-1 h-px w-4",
    studios: "mt-1 text-[9px]",
  },
} as const;

export default function Wordmark({ size = "hero", as = "div", className = "" }: WordmarkProps) {
  const Tag = as;
  const s = SIZES[size];

  return (
    <Tag className={`flex flex-col items-center ${className}`}>
      <span data-wordmark-64 className={`font-display font-bold text-ink ${s.number}`}>
        64.
      </span>
      <span data-wordmark-rule aria-hidden="true" className={`origin-left bg-ink ${s.rule}`} />
      <span
        data-wordmark-studios
        className={`font-display font-semibold uppercase tracking-[0.5em] text-ink ${s.studios}`}
      >
        Studios
      </span>
    </Tag>
  );
}
