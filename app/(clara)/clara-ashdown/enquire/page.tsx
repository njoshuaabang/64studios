import type { Metadata } from "next";
import PageHeader from "@/components/clara/PageHeader";
import EnquireForm from "@/components/clara/EnquireForm";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "For period properties in Gloucestershire and Oxfordshire. A few projects a year, and I reply to every genuine enquiry personally.",
};

export default function EnquirePage() {
  return (
    <div className="mx-auto max-w-clara-content px-[var(--gutter)] pb-[var(--space-section)]">
      <PageHeader
        title="Enquire"
        intro="For period properties in Gloucestershire and Oxfordshire. A few projects a year."
      />

      <EnquireForm />

      <p className="max-w-[46ch] pt-6 font-clara-display text-clara-base font-light italic leading-[1.6] text-clara-ink/80">
        I reply to every genuine enquiry personally, usually within a few days.
      </p>
    </div>
  );
}
