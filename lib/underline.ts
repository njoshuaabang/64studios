/**
 * The rule under a text link, present at rest.
 *
 * It used to sit at scale-x-0 and only draw itself on hover, which meant the
 * affordance did not exist until a pointer arrived — and on a touch device it
 * never arrived at all, so a phone visitor had nothing marking these as links.
 *
 * One ink pixel at rest, two on hover, per the rebrand spec. The rule grows
 * downward from the baseline side so the text above it does not shift, and
 * the height carries the change rather than opacity: a hairline that is
 * already full-strength ink reads as a drawn line rather than a faded one.
 * The transition is short enough not to lag a pointer and is dropped entirely
 * under reduced motion.
 *
 * One constant rather than the same seventy characters in seven files: the
 * home page CTA, the contact and subscribe buttons, the studio, services and
 * process links, and the 404.
 */
export const UNDERLINE =
  "absolute bottom-0 left-0 h-px w-full bg-ink transition-[height] duration-200 ease-out group-hover:h-0.5 group-focus-visible:h-0.5 motion-reduce:transition-none";

/**
 * A link inside a paragraph. The standalone rule above belongs to calls to
 * action; inside prose a full-strength rule under every link would pull the
 * eye off the sentence, so these sit lighter and darken on hover. Same colour
 * and offset as the address in the homepage footer.
 */
export const INLINE_LINK =
  "underline decoration-ink/35 decoration-1 underline-offset-4 transition-[text-decoration-color,text-decoration-thickness] duration-200 hover:decoration-ink hover:decoration-2 focus-visible:decoration-ink focus-visible:decoration-2 motion-reduce:transition-none";
