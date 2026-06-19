import { Footer } from "@/components/marketing/Footer";
import { Header } from "@/components/marketing/Header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Soft warm gradient band behind the header + page intro, shared
          across every marketing page for a consistent brand moment. */}
      <div className="bg-hero-gradient pointer-events-none absolute inset-x-0 top-0 h-[760px] overflow-hidden md:h-[860px]" aria-hidden>
        <div className="absolute inset-x-0 bottom-0 h-36 overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,32 C360,160 1080,0 1440,96 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
