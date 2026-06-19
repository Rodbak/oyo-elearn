"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { NeuButton } from "@/components/neu";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const { t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/#features", label: t("nav.features") },
    { href: "/#pricing",  label: t("nav.pricing")  },
    { href: "/#about",    label: t("nav.about")    },
    { href: "/#contact",  label: t("nav.contact")  },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-3 md:px-8 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 rounded-card bg-white/95 border border-surface-border/60 px-4 py-3 shadow-sm md:px-6"
        aria-label={t("nav.mainNav")}
      >
        {/* Logo — larger */}
        <Link
          href="/"
          className="font-display text-2xl font-extrabold tracking-tight text-accent focus-neu rounded-btn shrink-0"
        >
          OYO<span className="text-foreground">-Elearner</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-sm font-medium text-muted transition-colors hover:text-foreground focus-neu rounded-inner px-3 py-2 hover:scale-[1.02]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right controls */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <NeuButton variant="secondary" size="sm" asChild>
            <Link href="/login">{t("nav.login")}</Link>
          </NeuButton>
          <NeuButton size="lg" className="shadow-neu-extruded" asChild>
            <Link href="/register">{t("nav.getStarted")}</Link>
          </NeuButton>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <motion.button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-btn border border-surface-border bg-white shadow-neu-extruded-sm focus-neu"
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
        <div className="mx-auto mt-2 max-w-7xl rounded-card border border-surface-border bg-white p-6 shadow-neu-extruded md:hidden">
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
                  Settings
                </span>
                <LanguageSwitcher />
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
