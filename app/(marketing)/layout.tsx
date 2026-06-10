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
      <Header />
      <main>{children}</main>
      <Footer />
    </CurrencyProvider>
  );
}
