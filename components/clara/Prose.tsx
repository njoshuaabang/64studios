/**
 * Long-form body text: a journal essay or a work case study. The opening
 * paragraph takes the drop cap — this is the only component that sets one,
 * which is how the rule "long-form only, never nav or forms" is kept.
 *
 * Serif, because the tokens give reading copy to Fraunces and the sans to
 * everything else, and set at a measure the eye can turn at the end of.
 */
export default function Prose({
  opening,
  body,
}: {
  opening: string;
  body: string[];
}) {
  return (
    <div className="font-clara-display text-clara-prose font-light text-clara-ink [text-wrap:pretty]">
      <p className="dropcap max-w-[58ch]">{opening}</p>
      {body.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="mt-3 max-w-[58ch] clear-both">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
