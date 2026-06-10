"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuButton, NeuCard } from "@/components/neu";
import { Check } from "lucide-react";
import Link from "next/link";

export function PricingContent() {
  const { t, dictionary } = useLocale();

  const tiers = [
    { key: "free" as const, price: "₦0", highlighted: false, href: "/register" },
    { key: "pro" as const, price: "₦49,999", highlighted: true, href: "/register?plan=pro" },
    { key: "enterprise" as const, price: "custom", highlighted: false, href: "/contact" },
  ];

  const comparison = [
    { feature: t("pricing.features.liveClasses"), free: false, pro: true, enterprise: true },
    { feature: t("pricing.features.aiTutoring"), free: false, pro: true, enterprise: true },
    { feature: t("pricing.features.scormLti"), free: false, pro: true, enterprise: true },
    { feature: t("pricing.features.googleClassroom"), free: false, pro: true, enterprise: true },
    { feature: t("pricing.features.sso"), free: false, pro: false, enterprise: true },
  ];

  return (
    <div className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="font-display text-5xl font-extrabold md:text-6xl">
          {t("pricing.title")}
        </h1>
        <p className="mt-4 font-body text-lg text-muted">{t("pricing.subtitle")}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-8 lg:grid-cols-3">
        {tiers.map((tier) => {
          const tierMeta = dictionary.pricing[tier.key];
          const featureList = dictionary.pricing.tierFeatures[tier.key];

          return (
            <NeuCard
              key={tier.key}
              className={tier.highlighted ? "shadow-neu-extruded-hover -translate-y-1" : ""}
            >
              <p className="font-display text-sm font-bold uppercase text-accent">
                {tierMeta.name}
              </p>
              <p className="mt-2 font-display text-4xl font-extrabold">
                {tier.key === "enterprise" ? t("pricing.enterprise.custom") : tier.price}
                <span className="text-lg font-normal text-muted">{tierMeta.period}</span>
              </p>
              <p className="mt-2 font-body text-sm text-muted">{tierMeta.description}</p>
              <ul className="mt-6 space-y-3">
                {featureList.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-body text-sm">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-secondary"
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <NeuButton
                className="mt-8 w-full"
                variant={tier.highlighted ? "primary" : "secondary"}
                asChild
              >
                <Link href={tier.href}>{tierMeta.cta}</Link>
              </NeuButton>
            </NeuCard>
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-card shadow-neu-extruded">
        <table className="w-full font-body text-sm">
          <thead>
            <tr className="bg-background shadow-neu-inset-sm">
              <th className="p-4 text-left font-display font-bold">
                {t("pricing.comparisonFeature")}
              </th>
              <th className="p-4 text-center">{dictionary.pricing.free.name}</th>
              <th className="p-4 text-center">{dictionary.pricing.pro.name}</th>
              <th className="p-4 text-center">{dictionary.pricing.enterprise.name}</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.feature} className="bg-background">
                <td className="p-4 text-foreground">{row.feature}</td>
                {[row.free, row.pro, row.enterprise].map((val, i) => (
                  <td key={i} className="p-4 text-center text-muted">
                    {val ? (
                      <Check className="mx-auto h-5 w-5 text-accent-secondary" />
                    ) : (
                      "—"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
