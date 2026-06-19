"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mt-24 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-4">
            <p className="font-display text-2xl font-extrabold text-white">OYO-Elearner</p>
            <p className="max-w-md font-body text-sm text-slate-300">{t("footer.tagline")}</p>
          </div>
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-slate-200">
              {t("footer.product")}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/#pricing" className="hover:text-white focus-neu">
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white focus-neu">
                  {t("nav.features")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white focus-neu">
                  {t("nav.about")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-slate-200">
              {t("footer.company")}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/#contact" className="hover:text-white focus-neu">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white focus-neu">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white focus-neu">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} OYO-Elearner. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
