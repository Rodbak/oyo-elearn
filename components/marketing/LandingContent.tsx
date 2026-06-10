"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { HeroDecoration } from "@/components/marketing/HeroDecoration";
import { useCurrency } from "@/components/marketing/CurrencySwitcher";
import { NeuButton, NeuCard, NeuInput, NeuWell } from "@/components/neu";
import {
  Award,
  BookOpen,
  Check,
  Globe,
  GraduationCap,
  Mail,
  MessageSquare,
  Radio,
  Sparkles,
  Target,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const logos = [
  "Academic City University",
  "Nairobi Tech",
  "Accra Vocational",
  "Cape University",
];

const stats = [
  { value: "10,000+", labelKey: "landing.stats.students"     },
  { value: "500+",    labelKey: "landing.stats.courses"      },
  { value: "120+",    labelKey: "landing.stats.institutions" },
  { value: "98%",     labelKey: "landing.stats.completion"   },
] as const;

const featureItems = [
  { icon: Video,    titleKey: "landing.features.mux.title",          descKey: "landing.features.mux.description"          },
  { icon: Radio,    titleKey: "landing.features.live.title",         descKey: "landing.features.live.description"         },
  { icon: Sparkles, titleKey: "landing.features.ai.title",           descKey: "landing.features.ai.description"           },
  { icon: Award,    titleKey: "landing.features.certs.title",        descKey: "landing.features.certs.description"        },
  { icon: Globe,    titleKey: "landing.features.integrations.title", descKey: "landing.features.integrations.description" },
  { icon: Users,    titleKey: "landing.features.multiTenant.title",  descKey: "landing.features.multiTenant.description"  },
] as const;

const howItWorksItems = [
  { step: "01", titleKey: "landing.howItWorks.step1.title", descKey: "landing.howItWorks.step1.description" },
  { step: "02", titleKey: "landing.howItWorks.step2.title", descKey: "landing.howItWorks.step2.description" },
  { step: "03", titleKey: "landing.howItWorks.step3.title", descKey: "landing.howItWorks.step3.description" },
] as const;

const aboutCards = [
  { icon: GraduationCap, titleKey: "landing.about.cards.school.title",      descKey: "landing.about.cards.school.description"      },
  { icon: BookOpen,      titleKey: "landing.about.cards.university.title",   descKey: "landing.about.cards.university.description"   },
  { icon: Target,        titleKey: "landing.about.cards.vocational.title",   descKey: "landing.about.cards.vocational.description"   },
  { icon: Users,         titleKey: "landing.about.cards.platform.title",     descKey: "landing.about.cards.platform.description"     },
] as const;

const contactHighlights = [
  { icon: MessageSquare, titleKey: "landing.contactSection.highlight1.title", descKey: "landing.contactSection.highlight1.description" },
  { icon: GraduationCap, titleKey: "landing.contactSection.highlight2.title", descKey: "landing.contactSection.highlight2.description" },
  { icon: Globe,         titleKey: "landing.contactSection.highlight3.title", descKey: "landing.contactSection.highlight3.description" },
] as const;

const comparison = [
  { featureKey: "pricing.features.liveClasses",    free: false, pro: true,  enterprise: true  },
  { featureKey: "pricing.features.aiTutoring",     free: false, pro: true,  enterprise: true  },
  { featureKey: "pricing.features.scormLti",       free: false, pro: true,  enterprise: true  },
  { featureKey: "pricing.features.googleClassroom",free: false, pro: true,  enterprise: true  },
  { featureKey: "pricing.features.sso",            free: false, pro: false, enterprise: true  },
] as const;

export function LandingContent() {
  const { t, dictionary } = useLocale();
  const { currency } = useCurrency();
  const [contactSent, setContactSent] = useState(false);

  const tiers = [
    { key: "free"       as const, price: `${currency.symbol}0`,      highlighted: false, href: "/register"           },
    { key: "pro"        as const, price: currency.proPrice,           highlighted: true,  href: "/register?plan=pro"  },
    { key: "enterprise" as const, price: dictionary.pricing.enterprise.custom, highlighted: false, href: "#contact"  },
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-neu-extruded-sm mb-6">
              <GraduationCap className="h-4 w-4 text-accent" />
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
                {t("landing.tagline")}
              </p>
            </div>
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-foreground md:text-7xl leading-tight">
              {t("landing.heroTitle")}{" "}
              <span className="text-accent-secondary">{t("landing.heroTitleAccent")}</span>
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg text-muted leading-relaxed">
              {t("landing.heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <NeuButton size="lg" asChild>
                <Link href="/register">{t("landing.startFree")}</Link>
              </NeuButton>
              <NeuButton variant="secondary" size="lg" asChild>
                <Link href="#features">{t("landing.viewPricing")}</Link>
              </NeuButton>
            </div>
            {/* Stats row */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.labelKey} className="rounded-2xl bg-background p-4 shadow-neu-extruded-sm text-center">
                  <p className="font-display text-2xl font-extrabold text-accent">{s.value}</p>
                  <p className="mt-1 font-body text-xs text-muted">{t(s.labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
          <HeroDecoration />
        </div>
      </section>

      {/* ── TRUSTED BY ───────────────────────────────────────────── */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-card bg-background p-8 shadow-neu-inset">
          <p className="text-center font-body text-sm uppercase tracking-wider text-muted mb-6">
            {t("landing.trustedBy")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {logos.map((name) => (
              <span
                key={name}
                className="rounded-2xl bg-background px-6 py-3 font-display font-bold text-muted shadow-neu-extruded-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section id="features" className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-neu-extruded-sm mb-4">
              <BookOpen className="h-4 w-4 text-accent-secondary" />
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                {t("landing.platformFeatures")}
              </span>
            </div>
          </div>
          <h2 className="text-center font-display text-4xl font-extrabold md:text-5xl text-foreground">
            {t("landing.featuresTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center font-body text-muted">
            {t("landing.featuresSubtitle")}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map((f) => (
              <NeuCard
                key={f.titleKey}
                className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-neu-extruded-hover"
              >
                <NeuWell className="mb-4 inline-flex p-3 transition-all duration-300 group-hover:shadow-neu-inset-deep">
                  <f.icon className="h-6 w-6 text-accent" aria-hidden />
                </NeuWell>
                <h3 className="font-display text-xl font-bold text-foreground">{t(f.titleKey)}</h3>
                <p className="mt-2 font-body text-muted">{t(f.descKey)}</p>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-neu-extruded-sm mb-4">
              <Target className="h-4 w-4 text-accent" />
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
                {t("landing.howItWorks.title")}
              </span>
            </div>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl text-foreground">
              {t("landing.howItWorks.title")}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorksItems.map((item) => (
              <NeuCard key={item.step}>
                <NeuWell className="inline-flex h-14 w-14 items-center justify-center mb-4">
                  <span className="font-display text-xl font-extrabold text-accent">{item.step}</span>
                </NeuWell>
                <h3 className="font-display text-xl font-bold text-foreground">{t(item.titleKey)}</h3>
                <p className="mt-2 font-body text-muted">{t(item.descKey)}</p>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-neu-extruded-sm mb-6">
                <GraduationCap className="h-4 w-4 text-accent-secondary" />
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                  {t("about.title")}
                </span>
              </div>
              <h2 className="font-display text-4xl font-extrabold md:text-5xl text-foreground">
                {t("landing.about.title")}
              </h2>
              <p className="mt-6 font-body text-lg text-muted leading-relaxed">
                {t("landing.about.intro1")}
              </p>
              <p className="mt-4 font-body text-muted leading-relaxed">
                {t("landing.about.intro2")}
              </p>
              <p className="mt-4 font-body text-muted leading-relaxed">
                {t("landing.about.mission1")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {aboutCards.map((item) => (
                <NeuCard key={item.titleKey}>
                  <NeuWell className="inline-flex p-3 mb-3">
                    <item.icon className="h-5 w-5 text-accent" />
                  </NeuWell>
                  <h3 className="font-display text-base font-bold text-foreground">{t(item.titleKey)}</h3>
                  <p className="mt-1 font-body text-sm text-muted">{t(item.descKey)}</p>
                </NeuCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="pricing" className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-neu-extruded-sm mb-4">
              <Award className="h-4 w-4 text-accent" />
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
                {t("pricing.title")}
              </span>
            </div>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl text-foreground">
              {t("pricing.title")}
            </h2>
            <p className="mt-4 font-body text-lg text-muted">{t("pricing.subtitle")}</p>
            {/* Currency indicator */}
            <p className="mt-3 font-body text-sm text-muted">
              {t("landing.currency.disclaimer")
                .replace("{currency}", t(`landing.currency.names.${currency.code}`))
                .replace("{code}", currency.code)}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => {
              const tierMeta = dictionary.pricing[tier.key];
              const featureList = dictionary.pricing.tierFeatures[tier.key];
              return (
                <NeuCard
                  key={tier.key}
                  className={`flex flex-col transition-all duration-300 ${
                    tier.highlighted
                      ? "shadow-neu-extruded-hover -translate-y-2"
                      : "hover:-translate-y-1 hover:shadow-neu-extruded-hover"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="mb-4 inline-flex self-start rounded-full bg-accent px-3 py-1">
                      <span className="font-body text-xs font-bold text-white">
                        {t("pricing.mostPopular")}
                      </span>
                    </div>
                  )}
                  <p className="font-display text-sm font-bold uppercase text-accent">{tierMeta.name}</p>
                  <p className="mt-2 font-display text-4xl font-extrabold text-foreground">
                    {tier.price}
                    <span className="text-lg font-normal text-muted">{tierMeta.period}</span>
                  </p>
                  <p className="mt-2 font-body text-sm text-muted">{tierMeta.description}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {featureList.map((f) => (
                      <li key={f} className="flex items-start gap-2 font-body text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-secondary" aria-hidden />
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

          {/* Comparison table */}
          <div className="mt-16 overflow-hidden rounded-card shadow-neu-extruded">
            <table className="w-full font-body text-sm">
              <thead>
                <tr className="bg-background shadow-neu-inset-sm">
                  <th className="p-4 text-left font-display font-bold text-foreground">{t("pricing.comparisonFeature")}</th>
                  <th className="p-4 text-center font-display font-bold text-foreground">{t("pricing.freeLabel")}</th>
                  <th className="p-4 text-center font-display font-bold text-accent">{t("pricing.proLabel")}</th>
                  <th className="p-4 text-center font-display font-bold text-foreground">{t("pricing.enterpriseLabel")}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.featureKey} className="bg-background border-t border-background">
                    <td className="p-4 text-foreground">{t(row.featureKey)}</td>
                    {([row.free, row.pro, row.enterprise] as boolean[]).map((val, i) => (
                      <td key={i} className="p-4 text-center text-muted">
                        {val ? (
                          <Check className="mx-auto h-5 w-5 text-accent-secondary" />
                        ) : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-neu-extruded-sm mb-6">
                <Mail className="h-4 w-4 text-accent" />
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
                  {t("landing.contactSection.title")}
                </span>
              </div>
              <h2 className="font-display text-4xl font-extrabold md:text-5xl text-foreground">
                {t("landing.contactSection.heading")}
              </h2>
              <p className="mt-6 font-body text-lg text-muted leading-relaxed">
                {t("landing.contactSection.description")}
              </p>
              <div className="mt-8 space-y-4">
                {contactHighlights.map((item) => (
                  <div key={item.titleKey} className="flex gap-4 items-start">
                    <NeuWell className="inline-flex p-3 shrink-0">
                      <item.icon className="h-5 w-5 text-accent" />
                    </NeuWell>
                    <div>
                      <p className="font-display font-bold text-foreground">{t(item.titleKey)}</p>
                      <p className="font-body text-sm text-muted">{t(item.descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <NeuCard>
              {contactSent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <NeuWell className="inline-flex p-4">
                    <Check className="h-8 w-8 text-accent-secondary" />
                  </NeuWell>
                  <p className="font-display text-xl font-bold text-foreground">
                    {t("landing.contactSection.receivedTitle")}
                  </p>
                  <p className="font-body text-muted">
                    {t("landing.contactSection.receivedDescription")}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setContactSent(true); }}
                  className="space-y-6"
                >
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {t("landing.contactSection.sendMessage")}
                  </h3>
                  <NeuInput label={t("contact.name")} name="name" required />
                  <NeuInput label={t("contact.email")} name="email" type="email" required />
                  <NeuInput label={t("landing.contactSection.title")} name="institution" />
                  <div className="space-y-2">
                    <label htmlFor="message" className="font-body text-sm font-medium text-foreground">
                      {t("contact.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder={t("landing.contactSection.messagePlaceholder")}
                      className="w-full rounded-2xl bg-background px-4 py-3 font-body text-foreground placeholder:text-muted shadow-neu-inset focus:shadow-neu-inset-deep focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <NeuButton type="submit" className="w-full">
                    {t("contact.send")}
                  </NeuButton>
                </form>
              )}
            </NeuCard>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-card bg-background p-12 shadow-neu-extruded text-center">
          <NeuWell className="mx-auto inline-flex p-4 mb-6">
            <GraduationCap className="h-10 w-10 text-accent" aria-hidden />
          </NeuWell>
          <h2 className="font-display text-3xl font-extrabold md:text-4xl text-foreground">
            {t("landing.cta.title")}
          </h2>
          <p className="mt-4 font-body text-muted max-w-xl mx-auto">
            {t("landing.cta.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <NeuButton size="lg" asChild>
              <Link href="/register">{t("landing.cta.primary")}</Link>
            </NeuButton>
            <NeuButton variant="secondary" size="lg" asChild>
              <Link href="#contact">{t("landing.cta.secondary")}</Link>
            </NeuButton>
          </div>
        </div>
      </section>
    </>
  );
}
