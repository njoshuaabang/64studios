import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 pb-16 pt-16 md:pt-20">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">Contact</h1>
        <p className="mt-6 font-body text-base leading-relaxed text-ink">
          For brands that want to look the way they deserve to.
        </p>
        <ContactForm />
      </div>
    </main>
  );
}
