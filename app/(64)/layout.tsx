import PageTransition from "@/components/PageTransition";
import CornerNav from "@/components/CornerNav";
import FooterSlot from "@/components/FooterSlot";

/** Chrome for 64 Studios' own pages. Halden sits outside this group. */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      <CornerNav />
      {children}
      <FooterSlot />
    </PageTransition>
  );
}
