import Rise from "./Rise";

/**
 * The head of every page but the home one: the title in Fraunces, carrying
 * the same entrance the hero wordmark gets, and an optional line under it.
 * No eyebrow label above the heading — the tokens rule those out.
 */
export default function PageHeader({
  title,
  intro,
  meta,
}: {
  title: string;
  intro?: string;
  meta?: string;
}) {
  return (
    <header className="pb-8 pt-10">
      {meta && (
        <p className="pb-2 font-clara-body text-clara-meta text-clara-stone">{meta}</p>
      )}

      <Rise className="font-clara-display text-[clamp(30px,4.5vw,44px)] font-light leading-[1.15] tracking-[-0.01em] [font-optical-sizing:auto]">
        {title}
      </Rise>

      {intro && (
        <p className="mt-3 max-w-[52ch] font-clara-body text-clara-base text-clara-ink/80">
          {intro}
        </p>
      )}
    </header>
  );
}
