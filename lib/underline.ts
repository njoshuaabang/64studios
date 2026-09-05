/**
 * The rule under a text link, present at rest.
 *
 * It used to sit at scale-x-0 and only draw itself on hover, which meant the
 * affordance did not exist until a pointer arrived — and on a touch device it
 * never arrived at all, so a phone visitor had nothing marking these as links.
 * It is now a hairline at 35% ink by default and full strength on hover or
 * keyboard focus.
 *
 * Opacity rather than the old scale, because a rule that grows from nothing
 * has no resting state by definition. The transition is short enough not to
 * lag a pointer and is dropped entirely under reduced motion.
 *
 * One constant rather than the same seventy characters in seven files: the
 * home page CTA, the contact and subscribe buttons, the studio, services and
 * process links, and the 404.
 */
export const UNDERLINE =
  "absolute bottom-0 left-0 h-px w-full bg-ink opacity-[0.35] transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none";
