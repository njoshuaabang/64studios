/**
 * Not a colophon — one line, no credits, no typeface note. The disclosure
 * beneath it is the one addition to that rule: honesty that this is a
 * self-initiated concept, not a real studio, matters more than the minimalism
 * it costs.
 */
export default function SignOff() {
  return (
    <footer className="px-4 pb-8 pt-16 md:px-8 md:pt-20">
      <p className="font-nash-body text-sm text-nash-olive">
        Nash Calloway Design — Los Angeles / London.
      </p>
      <p className="mt-2 font-nash-body text-xs text-nash-ink/70">
        A self-initiated concept by{" "}
        <a href="https://64studios.design" className="transition-colors duration-200 hover:text-nash-brass">
          64 Studios
        </a>
        . Not a real business.
      </p>
    </footer>
  );
}
