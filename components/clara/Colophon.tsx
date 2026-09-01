/**
 * The colophon, which stands in place of a footer on every page — there is
 * no second set of nav links at the foot of this site. A printed quarterly
 * closes with its typeface credit and where it was made, so this one does
 * too. Copy and case are as set in `reference-home.html`.
 *
 * `w-full` is load-bearing: the colophon is a direct child of the layout's
 * column flexbox, where the auto side margins that centre it would otherwise
 * beat `align-items: stretch` and shrink it to the width of its own text.
 */
export default function Colophon() {
  return (
    <footer className="mx-auto flex w-full max-w-clara-content flex-col justify-between gap-1 border-t border-clara-ink/[0.14] px-[var(--gutter)] pb-7 pt-5 text-clara-micro tracking-[0.02em] text-clara-sage md:flex-row md:items-baseline">
      <div>set in fraunces &amp; inter — written and designed in the cotswolds</div>
      <div>
        clara ashdown design, est. 2019 —{" "}
        <span className="font-clara-display italic text-clara-meta text-clara-stone">
          gloucestershire, england
        </span>
      </div>
    </footer>
  );
}
