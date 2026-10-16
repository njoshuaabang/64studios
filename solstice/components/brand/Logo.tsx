import { CONSTRUCTION_PATH, HORIZON, RAYS, SOLSTICE_PATH, VIEWBOX } from "./logoGeometry";

type Props = {
  /** reversed: on photos and Ink. light: on Limestone. */
  variant?: "reversed" | "light";
  className?: string;
};

// The rays, horizon and wordmark carry data attributes so the intro can animate each part.
export function Logo({ variant = "reversed", className }: Props) {
  const reversed = variant === "reversed";
  return (
    <svg viewBox={VIEWBOX} role="img" aria-label="Solstice Construction" className={className}>
      <g data-logo-rays className="stroke-amber" strokeWidth={9} strokeLinecap="round">
        {RAYS.map(([x1, y1, x2, y2]) => (
          <line key={`${x2}`} data-logo-ray pathLength={1} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      <line
        data-logo-horizon
        pathLength={1}
        {...HORIZON}
        className={reversed ? "stroke-concrete" : "stroke-slate"}
        strokeWidth={6.3}
        strokeLinecap="round"
      />
      <g data-logo-wordmark>
        <path d={SOLSTICE_PATH} className={reversed ? "fill-limestone" : "fill-ink"} />
        <path d={CONSTRUCTION_PATH} className={reversed ? "fill-concrete" : "fill-slate"} />
      </g>
    </svg>
  );
}
