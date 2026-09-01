import Image from "next/image";
import EnquireForm from "@/components/EnquireForm";
import Reveal from "@/components/Reveal";
import { asset } from "@/lib/basePath";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/enquire",
  title: "Enquire | Halden Members’ Club, London W1",
  description:
    "Enquire about membership, private dining or bedroom reservations at Halden, Marylebone.",
});

export default function EnquirePage() {
  return (
    <main className="relative flex min-h-[640px] flex-1 lg:grid lg:grid-cols-2">
      {/*
        Desktop: the corridor is the left half of the page. Below that it sits
        behind the form instead, quiet enough to read straight through.
      */}
      <div className="absolute inset-0 opacity-15 lg:relative lg:inset-auto lg:opacity-100">
        <Image
          src={asset("/images/corridor.jpg")}
          alt="An upstairs corridor lined with dark green panelled doors, one of them standing open to the light."
          fill
          priority
          quality={82}
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="relative flex items-center px-[var(--gutter)] py-16 lg:py-24">
        <div className="w-full max-w-[420px]">
          <Reveal>
            <h1 className="font-display text-display font-light">Enquire</h1>
            <p className="pt-4 text-base">
              For membership, private dining or a bedroom reservation, write to
              us here. Every enquiry is read and answered by the house, usually
              within two working days.
            </p>
          </Reveal>

          <Reveal className="pt-12">
            <EnquireForm />
          </Reveal>
        </div>
      </div>
    </main>
  );
}
