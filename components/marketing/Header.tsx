"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { NeuButton } from "@/components/neu";
import { GraduationCap, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const { t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/#features", label: t("nav.features") },
    { href: "/#pricing",  label: t("nav.pricing")  },
    { href: "/#about",    label: t("nav.about")    },
    { href: "/#contact",  label: t("nav.contact")  },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-surface-border/40 bg-white/80 backdrop-blur-xl"
          : "border-transparent bg-white/40 backdrop-blur-md"
      }`}
    >
      <nav
        className="relative mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8"
        aria-label={t("nav.mainNav")}
      >
        {/* Left: logo with mark */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-btn focus-neu"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-accent">
            OYO<span className="text-foreground">-Elearning</span>
          </span>
        </Link>

        {/* Center: nav links pinned to the absolute middle of the bar */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 font-body text-sm font-medium text-muted transition-colors duration-150 hover:bg-accent/8 hover:text-accent focus-neu"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: controls + mobile hamburger */}
        <div className="ml-auto flex items-center">
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher className="border border-surface-border/60 bg-white/70" />
            <NeuButton variant="secondary" size="sm" asChild>
              <Link href="/login">{t("nav.login")}</Link>
            </NeuButton>
            <NeuButton size="sm" asChild>
              <Link href="/register">{t("nav.getStarted")}</Link>
            </NeuButton>
          </div>

          <motion.button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-btn border border-surface-border bg-white shadow-neu-extruded-sm focus-neu md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={mobileOpen}
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-auto max-w-7xl border-t border-surface-border/40 bg-white/90 px-4 py-6 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-inner px-2 py-1 font-body text-lg text-foreground focus-neu"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-col gap-4 border-t border-surface-border pt-4">
              <div className="flex flex-col gap-2">
                <span className="font-body text-xs font-semibold uppercase text-muted">
                  {t("common.settings")}
                </span>
                <LanguageSwitcher className="border border-surface-border/60 bg-white/70" />
              </div>
              <NeuButton variant="secondary" asChild>
                <Link href="/login">{t("nav.login")}</Link>
              </NeuButton>
              <NeuButton asChild>
                <Link href="/register">{t("nav.getStarted")}</Link>
              </NeuButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

