"use client";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuButton } from "@/components/neu";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#features", label: t("nav.features") },
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-4 md:px-8">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-card bg-background px-4 py-4 shadow-neu-extruded md:px-6"
        aria-label={t("nav.mainNav")}
      >
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-tight text-accent focus-neu rounded-btn shrink-0"
        >
          OYO<span className="text-foreground">-Elearner</span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-sm font-medium text-muted transition-colors hover:text-foreground focus-neu rounded-inner px-2 py-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <NeuButton variant="secondary" size="sm" asChild>
            <Link href="/login">{t("nav.login")}</Link>
          </NeuButton>
          <NeuButton size="sm" asChild>
            <Link href="/register">{t("nav.getStarted")}</Link>
          </NeuButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-btn bg-background shadow-neu-extruded-sm focus-neu"
            onClick={() => setOpen(!open)}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-card bg-background p-6 shadow-neu-extruded md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block font-body text-lg text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-col gap-3 pt-4">
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
