import { particulars, guidePrice, particularsHeading } from "@/lib/halden/copy";

/**
 * A definition list, never a table. These are twelve terms and their values,
 * not rows and columns of data, and a <table> would announce a grid that
 * isn't there.
 *
 * Labels take the display serif, small and letter-spaced, because they are
 * headings for their values rather than text to be read in sequence. Values
 * take the body face at reading size. The geometry — the measure, the rules,
 * the gap above the price — is in globals.css under `.particulars`.
 */
const LABEL =
  "font-halden-display text-halden-micro uppercase tracking-halden-label text-halden-ink/70";
const VALUE = "text-halden-note text-halden-ink";

export default function Particulars() {
  return (
    <section aria-labelledby="particulars-heading" className="particulars">
      <div className="particulars-inner">
        <h2
          id="particulars-heading"
          className="font-halden-display text-halden-micro uppercase tracking-halden-label text-halden-brass"
        >
          {particularsHeading}
        </h2>

        <dl className="particulars-list pt-10">
          {particulars.map((row) => (
            <div key={row.label} className="particulars-row">
              <dt className={LABEL}>{row.label}</dt>
              <dd className={`${VALUE} text-left md:text-right`}>{row.value}</dd>
            </div>
          ))}

          <div className="particulars-price">
            <dt className={LABEL}>{guidePrice.label}</dt>
            <dd className="text-halden-display font-halden-display font-light text-halden-ink text-left md:text-right">
              {guidePrice.value}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
