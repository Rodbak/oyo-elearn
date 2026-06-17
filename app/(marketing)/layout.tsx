import { Footer } from "@/components/marketing/Footer";
import { Header } from "@/components/marketing/Header";
import { CurrencyProvider } from "@/components/marketing/CurrencySwitcher";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      <div className="relative">
        {/* Soft warm gradient band behind the header + page intro, shared
            across every marketing page for a consistent brand moment. */}
        <div className="bg-hero-gradient pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden />
        <div className="relative">
          <Header />
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </CurrencyProvider>
  );
}
