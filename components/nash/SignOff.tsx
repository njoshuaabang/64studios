/**
 * The whole footer. Not a colophon — one line, no credits, no typeface note.
 * `onDark` is for the home hero, where olive on photography would not read.
 */
export default function SignOff({ onDark = false }: { onDark?: boolean }) {
  return (
    <footer className={onDark ? "" : "px-4 pb-8 pt-16 md:px-8 md:pt-20"}>
      <p className={`font-nash-body text-sm ${onDark ? "text-nash-plaster/75" : "text-nash-olive"}`}>
        Nash Calloway Design — Los Angeles / London.
      </p>
    </footer>
  );
}
