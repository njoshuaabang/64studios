type TaglineLockupProps = {
  lines?: readonly [string] | readonly [string, string];
  className?: string;
};

const SITE_LINES = ["Branding Agency"] as const;

export default function TaglineLockup({ lines = SITE_LINES, className = "" }: TaglineLockupProps) {
  const [primary, secondary] = lines;

  return (
    <div data-tagline className={`flex flex-col items-center text-center ${className}`}>
      <span className="whitespace-nowrap font-body text-xs uppercase tracking-[0.3em] text-ink sm:text-sm">
        {primary}
      </span>
      {secondary ? (
        <span className="mt-1 whitespace-nowrap font-body text-[10px] uppercase tracking-[0.3em] text-ink sm:text-xs">
          {secondary}
        </span>
      ) : null}
    </div>
  );
}
