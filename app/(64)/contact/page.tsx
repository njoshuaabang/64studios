import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Start a project — 64 Studios",
  url: `${SITE_URL}/contact`,
};

export const metadata: Metadata = {
  title: { absolute: "Start a project — 64 Studios" },
  description: "Tell 64 Studios about your business and the homes it works on.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a project — 64 Studios",
    description: "Tell 64 Studios about your business and the homes it works on.",
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-dvh flex-col items-center px-4 pb-16 pt-16 md:pt-20">
      <JsonLd data={contactPageSchema} />
      <div className="w-full max-w-md">
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Begin</h1>
        <p className="mt-6 font-body text-base leading-relaxed text-ink">
          Tell the studio about your business and the projects it is proudest of. The details can
          come later.
        </p>
        {/* The form reads ?option= to pre-select a radio, which is a client
            hook. The boundary keeps the page itself statically prerendered
            rather than forcing the whole route to render per request. */}
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </main>
  );
}
