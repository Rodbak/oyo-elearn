"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { HeroDecoration } from "@/components/marketing/HeroDecoration";
import { NeuButton, NeuCard, NeuWell } from "@/components/neu";
import {
  Award,
  BookOpen,
  Globe,
  GraduationCap,
  Radio,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";

const logos = ["Lagos Academy", "Nairobi Tech", "Accra Vocational", "Cape University"];

export function LandingContent() {
  const { t } = useLocale();

  const featureItems = [
    { icon: Video, titleKey: "landing.features.mux.title", descKey: "landing.features.mux.description" },
    { icon: Radio, titleKey: "landing.features.live.title", descKey: "landing.features.live.description" },
    { icon: Sparkles, titleKey: "landing.features.ai.title", descKey: "landing.features.ai.description" },
    { icon: Award, titleKey: "landing.features.certs.title", descKey: "landing.features.certs.description" },
    { icon: Globe, titleKey: "landing.features.integrations.title", descKey: "landing.features.integrations.description" },
    { icon: Users, titleKey: "landing.features.multiTenant.title", descKey: "landing.features.multiTenant.description" },
  ];

  return (
    <>
      <section className="px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-wider text-accent-secondary">
              {t("landing.tagline")}
            </p>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
              {t("landing.heroTitle")}{" "}
              <span className="text-accent">{t("landing.heroTitleAccent")}</span>
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg text-muted">
              {t("landing.heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <NeuButton size="lg" asChild>
                <Link href="/register">{t("landing.startFree")}</Link>
              </NeuButton>
              <NeuButton variant="secondary" size="lg" asChild>
                <Link href="/pricing">{t("landing.viewPricing")}</Link>
              </NeuButton>
            </div>
          </div>
          <HeroDecoration />
        </div>
      </section>

      <section id="features" className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-display text-4xl font-extrabold md:text-5xl">
            {t("landing.featuresTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center font-body text-muted">
            {t("landing.featuresSubtitle")}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map((f) => (
              <NeuCard key={f.titleKey}>
                <NeuWell className="mb-4 inline-flex p-3">
                  <f.icon className="h-6 w-6 text-accent" aria-hidden />
                </NeuWell>
                <h3 className="font-display text-xl font-bold">{t(f.titleKey)}</h3>
                <p className="mt-2 font-body text-muted">{t(f.descKey)}</p>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl rounded-card bg-background p-8 shadow-neu-inset md:p-12">
          <p className="text-center font-body text-sm uppercase tracking-wider text-muted">
            {t("landing.trustedBy")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
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

      <section className="px-4 py-16 md:px-8">
        <NeuCard className="mx-auto max-w-4xl text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-accent" aria-hidden />
          <h2 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">
            {t("landing.freemiumTitle")}
          </h2>
          <p className="mt-4 font-body text-muted">{t("landing.freemiumSubtitle")}</p>
          <NeuButton className="mt-8" size="lg" asChild>
            <Link href="/register">{t("landing.createInstitution")}</Link>
          </NeuButton>
        </NeuCard>
      </section>

      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 rounded-card bg-background p-12 shadow-neu-extruded text-center">
          <BookOpen className="h-10 w-10 text-accent-secondary" aria-hidden />
          <h2 className="font-display text-3xl font-extrabold">{t("landing.ctaTitle")}</h2>
          <NeuButton size="lg" asChild>
            <Link href="/contact">{t("landing.talkToTeam")}</Link>
          </NeuButton>
        </div>
      </section>
    </>
  );
}
