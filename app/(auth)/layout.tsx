import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { FloatingShape } from "@/components/motion/FloatingShape";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="bg-hero-gradient pointer-events-none absolute inset-0" aria-hidden />
      <FloatingShape
        className="left-[8%] top-[12%] h-24 w-24 rounded-[40%_60%_60%_40%/50%_40%_60%_50%] bg-badge-sky/20 md:h-32 md:w-32"
        duration={8}
        yOffset={14}
      />
      <FloatingShape
        className="bottom-[15%] right-[10%] h-20 w-20 rounded-[55%_45%_45%_55%/55%_45%_55%_45%] bg-badge-coral/20 md:h-28 md:w-28"
        duration={7}
        delay={0.3}
        yOffset={12}
      />

      <div className="relative right-4 top-4 mb-4 self-end md:absolute md:right-8 md:top-8">
        <LanguageSwitcher />
      </div>
      <Link
        href="/"
        className="relative mb-8 font-display text-2xl font-extrabold text-accent focus-neu"
      >
        OYO<span className="text-foreground">-Elearning</span>
      </Link>
      <Reveal className="relative w-full max-w-md">{children}</Reveal>
    </div>
  );
}

