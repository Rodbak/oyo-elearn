"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mt-24 px-4 pb-12 md:px-8">
      <div className="mx-auto max-w-7xl rounded-card bg-background p-8 shadow-neu-inset md:p-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-extrabold text-accent">
              OYO-Elearner
            </p>
            <p className="mt-3 max-w-md font-body text-muted">{t("footer.tagline")}</p>
          </div>
          <div>
            <p className="font-display text-sm font-bold text-foreground">
              {t("footer.product")}
            </p>
            <ul className="mt-4 space-y-2 font-body text-sm text-muted">
              <li>
                <Link href="/pricing" className="hover:text-foreground focus-neu">
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-foreground focus-neu">
                  {t("nav.features")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-bold text-foreground">
              {t("footer.company")}
            </p>
            <ul className="mt-4 space-y-2 font-body text-sm text-muted">
              <li>
                <Link href="/about" className="hover:text-foreground focus-neu">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground focus-neu">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-center font-body text-sm text-muted">
          © {new Date().getFullYear()} OYO-Elearner. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
