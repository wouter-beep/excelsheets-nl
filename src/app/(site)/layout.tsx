import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="inhoud" className="overflow-x-clip">{children}</main>
      <Footer />
      <MobileCta />
    </>
  );
}
