import { holding } from "@/lib/content";
import { Nav } from "../nav/Nav";
import { TransitionLink } from "../transition/TransitionLink";
import { PageReveal } from "./PageReveal";

type Props = { title: string; children: React.ReactNode };

/** Nav, an H1, a short body and "Back home", on Ink. */
export function HoldingPage({ title, children }: Props) {
  return (
    <PageReveal>
      <div className="flex min-h-svh flex-col">
        <Nav />
        <main id="main" tabIndex={-1} className="shell flex-1 pt-16 pb-24 md:pt-24">
          <div className="grid grid-cols-1 gap-x-6 md:grid-cols-12">
            <div className="md:col-span-8 lg:col-span-7">
              <h1 data-rise className="font-display text-section">
                {title}
              </h1>
              <div data-reveal="1" className="mt-6 max-w-[34rem] space-y-6 text-body">
                {children}
              </div>
              <p data-reveal="2" className="mt-12">
                <TransitionLink href="/" className="text-link text-label uppercase">
                  {holding.backHome}
                </TransitionLink>
              </p>
            </div>
          </div>
        </main>
      </div>
    </PageReveal>
  );
}
