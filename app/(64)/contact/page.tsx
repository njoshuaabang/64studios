import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Start a Project — 64 Studios",
  url: `${SITE_URL}/contact`,
};

export const metadata: Metadata = {
  title: { absolute: "Start a Project — 64 Studios" },
  description:
    "Start a conversation about brand identity or website design with 64 Studios.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a Project — 64 Studios",
    description:
      "Start a conversation about brand identity or website design with 64 Studios.",
  },
};

export default function ContactPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 pb-16 pt-16 md:pt-20">
      <JsonLd data={contactPageSchema} />
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Begin</h1>
        <p className="mt-6 font-body text-base leading-relaxed text-ink">
          {"Tell the studio what you're making. Enough to get a sense of it \u2014 the details can come later."}
        </p>
        <ContactForm />
      </div>
    </main>
  );
}
