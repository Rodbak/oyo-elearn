"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocaleCurrencyBar } from "@/components/marketing/LocaleCurrencyBar";
import { NeuButton } from "@/components/neu";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const { t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCompanyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const standaloneLinks = [
    { href: "/#features", label: t("nav.features") },
    { href: "/#pricing",  label: t("nav.pricing")  },
  ];

  const companyLinks = [
    { href: "/#about",   label: t("nav.about")   },
    { href: "/#contact", label: t("nav.contact")  },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-4 md:px-8">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-card bg-white border border-surface-border px-6 py-4 shadow-neu-extruded md:px-8"
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
          {standaloneLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-sm font-medium text-muted transition-colors hover:text-foreground focus-neu rounded-inner px-2 py-1"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Company dropdown */}
          <li ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setCompanyOpen((v) => !v)}
              className="flex items-center gap-1 font-body text-sm font-medium text-muted transition-colors hover:text-foreground focus-neu rounded-inner px-2 py-1"
            >
              Company
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  companyOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {companyOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-40 -translate-x-1/2 overflow-hidden rounded-card border border-surface-border bg-white py-1 shadow-neu-extruded">
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setCompanyOpen(false)}
                    className="block px-4 py-2.5 font-body text-sm text-muted transition-colors hover:bg-accent/5 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Desktop right controls */}
        <div className="hidden items-center gap-3 md:flex">
          <LocaleCurrencyBar />
          <NeuButton variant="secondary" size="sm" asChild>
            <Link href="/login">{t("nav.login")}</Link>
          </NeuButton>
          <NeuButton size="sm" asChild>
            <Link href="/register">{t("nav.getStarted")}</Link>
          </NeuButton>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-btn border border-surface-border bg-white shadow-neu-extruded-sm focus-neu"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-card border border-surface-border bg-white p-6 shadow-neu-extruded md:hidden">
          <ul className="flex flex-col gap-4">
            {[...standaloneLinks, ...companyLinks].map((link) => (
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
                <LocaleCurrencyBar />
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
