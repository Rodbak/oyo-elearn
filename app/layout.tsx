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
    "Multi-tenant SaaS eLearning for K-12 schools, universities, and vocational institutes. Courses, live classes, AI tutoring, certificates, and LMS integrations.",
  keywords: [
    "eLearning", "LMS", "Africa", "schools", "universities",
    "SCORM", "LTI", "certificates", "online courses", "vocational",
  ],
  authors: [{ name: "OYO-Elearner" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://oyo-elearn.vercel.app",
    siteName: "OYO-Elearner",
    title: "OYO-Elearner — Where Schools Teach, Students Grow",
    description:
      "The institutional eLearning platform built for K-12 schools, universities, and vocational centres across Africa and beyond.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OYO-Elearner platform preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OYO-Elearner — Where Schools Teach, Students Grow",
    description:
      "The institutional eLearning platform built for K-12 schools, universities, and vocational centres across Africa and beyond.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();
  return (
    <html lang={locale} className={`${plusJakarta.variable} ${dmSans.variable}`}>
      <body>
        <SessionProvider>
          <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
