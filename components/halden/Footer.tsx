const linkStyle =
  "text-halden-brass underline-offset-4 transition-colors duration-300 hover:underline";

export default function Footer() {
  return (
    <footer className="w-full px-[var(--gutter)] pb-6 pt-[var(--space-section)]">
      <div className="border-t border-halden-brass/70 pt-4">
        <address className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-halden-small not-italic">
          <span>18 Marylebone, London W1</span>
          <a href="mailto:enquiries@halden.london" className={linkStyle}>
            enquiries@halden.london
          </a>
          <a
            href="https://www.instagram.com/halden.london"
            target="_blank"
            rel="noreferrer"
            className={linkStyle}
          >
            Instagram
          </a>
        </address>

        <p className="pt-10 text-halden-micro text-halden-ink/70">
          Self-initiated concept. 64 Studios.
        </p>
      </div>
    </footer>
  );
}
