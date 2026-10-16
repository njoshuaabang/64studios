import { footer, site } from "@/lib/content";

/** Site B footer: Limestone, a Concrete rule above, small Slate type. */
export function Footer() {
  return (
    <footer className="bg-limestone text-slate">
      <div className="shell">
        <div className="flex flex-col gap-3 border-t border-concrete py-8 text-small md:flex-row md:items-baseline md:justify-between">
          <p>
            {footer.company} · {footer.place} ·{" "}
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-link whitespace-nowrap">
              {site.phone}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${site.email}`} className="text-link whitespace-nowrap">
              {site.email}
            </a>
          </p>
          <p className="whitespace-nowrap">{site.credit}</p>
        </div>
      </div>
    </footer>
  );
}
