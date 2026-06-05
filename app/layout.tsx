import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { getServerLocale } from "@/lib/i18n/server";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OYO-Elearner — Institutional eLearning for Africa & Beyond",
    template: "%s | OYO-Elearner",
  },
  description:
    "Multi-tenant SaaS eLearning for K-12 schools, universities, and vocational institutes. Courses, live classes, certificates, and LMS integrations.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} className={`${plusJakarta.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <LocaleProvider initialLocale={locale}>
          <SessionProvider>{children}</SessionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
