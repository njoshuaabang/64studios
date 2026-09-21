import type { Metadata } from "next";
import { Suspense } from "react";
import ChecklistForm from "@/components/ChecklistForm";

export const metadata: Metadata = {
  // Absolute: the handoff sets the whole string, so the "%s — 64 Studios"
  // template must not append to it.
  title: { absolute: "Before the enquiry: a checklist | 64 Studios" },
  description:
    "Ten checks the studio runs on every website for firms that design and build houses. One page, about five minutes.",
  alternates: { canonical: "/checklist" },
};

/**
 * Linked only from YouTube video descriptions — nothing in the nav or the
 * footer points here. Laid out like /contact, with the same measure and the
 * same field styles.
 */
export default function ChecklistPage() {
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-dvh flex-col items-center px-4 pb-16 pt-16 md:pt-20">
      <div className="w-full max-w-md">
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Before the enquiry</h1>
        <p className="mt-6 font-body text-base leading-relaxed text-ink">
          Ten checks the studio runs on every website for firms that design and build houses. One
          page. Most people finish it in five minutes and know where their enquiries are going.
        </p>
        {/* The form reads ?ref= to credit the video it came from, which is a
            client hook. The boundary keeps the page itself static. */}
        <Suspense fallback={null}>
          <ChecklistForm />
        </Suspense>
      </div>
    </main>
  );
}
