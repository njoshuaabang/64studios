import PageTransition from "@/components/PageTransition";
import CornerNav from "@/components/CornerNav";
import FooterSlot from "@/components/FooterSlot";
import { display, body } from "@/lib/fonts";

/**
 * Chrome for 64 Studios' own pages, and 64's font variables — declared here
 * rather than in the root layout, so a Halden or Nash Calloway page doesn't
 * load them too.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} font-body`}>
      <PageTransition>
        <CornerNav />
        {children}
        <FooterSlot />
      </PageTransition>
    </div>
  );
}
