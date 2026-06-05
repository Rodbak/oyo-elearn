import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <LanguageSwitcher />
      </div>
      <Link
        href="/"
        className="mb-8 font-display text-2xl font-extrabold text-accent focus-neu"
      >
        OYO-Elearner
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
