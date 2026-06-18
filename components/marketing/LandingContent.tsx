"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { HeroDecoration } from "@/components/marketing/HeroDecoration";
import { useCurrency } from "@/components/marketing/CurrencySwitcher";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { NeuAvatar, NeuButton, NeuCard, NeuInput, NeuWell } from "@/components/neu";
import { cn } from "@/lib/utils";
import {
  Award,
  BookOpen,
  Briefcase,
  Check,
  Code,
  Database,
  GraduationCap,
  Globe,
  Mail,
  Megaphone,
  MessageSquare,
  Palette,
  Radio,
  Smartphone,
  Sparkles,
  Star,
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
  { value: "1,000+", labelKey: "landing.stats.students"     },
  { value: "500+",    labelKey: "landing.stats.courses"      },
  { value: "120+",    labelKey: "landing.stats.institutions" },
  { value: "98%",     labelKey: "landing.stats.completion"   },
] as const;

const featureItems = [
  { icon: Video,    titleKey: "landing.features.mux.title",          descKey: "landing.features.mux.description",          iconCls: "bg-badge-sky/15 text-badge-sky",       bg: "from-badge-sky/8 to-transparent",     label: "Video"        },
  { icon: Radio,    titleKey: "landing.features.live.title",         descKey: "landing.features.live.description",         iconCls: "bg-badge-coral/15 text-badge-coral",   bg: "from-badge-coral/8 to-transparent",   label: "Live"         },
  { icon: Sparkles, titleKey: "landing.features.ai.title",           descKey: "landing.features.ai.description",           iconCls: "bg-badge-violet/15 text-badge-violet", bg: "from-badge-violet/8 to-transparent",  label: "AI"           },
  { icon: Award,    titleKey: "landing.features.certs.title",        descKey: "landing.features.certs.description",        iconCls: "bg-badge-amber/15 text-badge-amber",   bg: "from-badge-amber/8 to-transparent",   label: "Certificates" },
  { icon: Globe,    titleKey: "landing.features.integrations.title", descKey: "landing.features.integrations.description", iconCls: "bg-badge-mint/15 text-badge-mint",     bg: "from-badge-mint/8 to-transparent",    label: "Integrations" },
  { icon: Users,    titleKey: "landing.features.multiTenant.title",  descKey: "landing.features.multiTenant.description",  iconCls: "bg-accent/10 text-accent",             bg: "from-accent/8 to-transparent",        label: "Multi-tenant" },
] as const;

const howItWorksItems = [
  { step: "01", titleKey: "landing.howItWorks.step1.title", descKey: "landing.howItWorks.step1.description" },
  { step: "02", titleKey: "landing.howItWorks.step2.title", descKey: "landing.howItWorks.step2.description" },
  { step: "03", titleKey: "landing.howItWorks.step3.title", descKey: "landing.howItWorks.step3.description" },
] as const;

const aboutCards = [
  { icon: GraduationCap, titleKey: "landing.about.cards.creators.title",   descKey: "landing.about.cards.creators.description"   },
  { icon: BookOpen,      titleKey: "landing.about.cards.courses.title",    descKey: "landing.about.cards.courses.description"    },
  { icon: Target,        titleKey: "landing.about.cards.learning.title",   descKey: "landing.about.cards.learning.description"   },
  { icon: Users,         titleKey: "landing.about.cards.teams.title",      descKey: "landing.about.cards.teams.description"      },
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

type Tone = "coral" | "amber" | "violet" | "sky" | "mint";

const toneBadge: Record<Tone, string> = {
  coral: "bg-badge-coral/10 text-badge-coral",
  amber: "bg-badge-amber/10 text-badge-amber",
  violet: "bg-badge-violet/10 text-badge-violet",
  sky: "bg-badge-sky/10 text-badge-sky",
  mint: "bg-badge-mint/10 text-badge-mint",
};

const toneThumb: Record<Tone, string> = {
  coral: "bg-badge-coral/15 text-badge-coral",
  amber: "bg-badge-amber/15 text-badge-amber",
  violet: "bg-badge-violet/15 text-badge-violet",
  sky: "bg-badge-sky/15 text-badge-sky",
  mint: "bg-badge-mint/15 text-badge-mint",
};

const categoryItems = [
  { key: "webDev",       icon: Code,       tone: "sky"    as Tone, count: 86 },
  { key: "dataScience",  icon: Database,   tone: "violet" as Tone, count: 54 },
  { key: "design",       icon: Palette,    tone: "coral"  as Tone, count: 41 },
  { key: "business",     icon: Briefcase,  tone: "amber"  as Tone, count: 37 },
  { key: "mobileApps",   icon: Smartphone, tone: "mint"   as Tone, count: 29 },
  { key: "marketing",    icon: Megaphone,  tone: "sky"    as Tone, count: 22 },
] as const;

const featuredCourseItems = [
  {
    title: "Complete HTML, CSS & JavaScript",
    instructor: "Amara Boateng",
    rating: 4.8,
    free: true,
    tone: "sky" as Tone,
    icon: Code,
  },
  {
    title: "Data Analysis with Python",
    instructor: "Kwame Asante",
    rating: 4.7,
    free: true,
    tone: "violet" as Tone,
    icon: Database,
  },
  {
    title: "UI/UX Design Fundamentals",
    instructor: "Naledi Dube",
    rating: 4.9,
    free: false,
    price: "$49",
    tone: "coral" as Tone,
    icon: Palette,
  },
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
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-neu-extruded-sm mb-6">
                <GraduationCap className="h-4 w-4 text-sunset" />
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-sunset">
                  {t("landing.tagline")}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display text-5xl font-extrabold tracking-tight text-foreground md:text-7xl leading-tight">
                {t("landing.heroTitle")}{" "}
                <span className="text-accent-secondary">{t("landing.heroTitleAccent")}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl font-body text-lg text-muted leading-relaxed">
                {t("landing.heroSubtitle")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-4">
                <NeuButton size="lg" asChild>
                  <Link href="/register">{t("landing.startFree")}</Link>
                </NeuButton>
                <NeuButton variant="secondary" size="lg" asChild>
                  <Link href="#features">{t("landing.viewPricing")}</Link>
                </NeuButton>
              </div>
            </Reveal>
            {/* Stats row — restyled */}
            <Stagger
              className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
              stagger={0.08}
            >
              {[
                { value: stats[0].value, labelKey: stats[0].labelKey, icon: Users,         bg: "from-badge-sky/20 to-badge-sky/5",     iconCls: "bg-badge-sky/15 text-badge-sky",     numCls: "text-badge-sky"     },
                { value: stats[1].value, labelKey: stats[1].labelKey, icon: BookOpen,      bg: "from-badge-violet/20 to-badge-violet/5", iconCls: "bg-badge-violet/15 text-badge-violet", numCls: "text-badge-violet" },
                { value: stats[2].value, labelKey: stats[2].labelKey, icon: GraduationCap, bg: "from-badge-coral/20 to-badge-coral/5",  iconCls: "bg-badge-coral/15 text-badge-coral",  numCls: "text-badge-coral"  },
                { value: stats[3].value, labelKey: stats[3].labelKey, icon: Award,         bg: "from-badge-amber/20 to-badge-amber/5",  iconCls: "bg-badge-amber/15 text-badge-amber",  numCls: "text-badge-amber"  },
              ].map((stat) => (
                <div
                  key={stat.labelKey}
                  className={`rounded-card bg-gradient-to-br ${stat.bg} p-5 shadow-neu-extruded-sm`}
                >
                  <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${stat.iconCls}`}>
                    <stat.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="font-body text-xs text-muted">{t(stat.labelKey)}</p>
                  <p className={`mt-0.5 font-display text-2xl font-extrabold ${stat.numCls}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.1}>
            <HeroDecoration />
          </Reveal>
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

      {/* ── POPULAR CATEGORIES ───────────────────────────────────── */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-neu-extruded-sm mb-4">
                  <Sparkles className="h-4 w-4 text-sunset" />
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-sunset">
                    {t("landing.categories.eyebrow")}
                  </span>
                </div>
                <h2 className="font-display text-4xl font-extrabold md:text-5xl text-foreground">
                  {t("landing.categories.title")}
                </h2>
                <p className="mt-3 max-w-xl font-body text-muted">{t("landing.categories.subtitle")}</p>
              </div>
              <NeuButton variant="secondary" asChild>
                <Link href="#pricing">{t("landing.categories.viewAll")}</Link>
              </NeuButton>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6" stagger={0.06}>
            {categoryItems.map((item) => (
              <div
                key={item.key}
                className="group flex flex-col items-center gap-3 rounded-card bg-background p-6 text-center shadow-neu-extruded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-neu-extruded-hover"
              >
                <div className={cn("flex h-14 w-14 items-center justify-center rounded-full", toneBadge[item.tone])}>
                  <item.icon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-foreground">
                    {t(`landing.categories.items.${item.key}`)}
                  </p>
                  <p className="font-body text-xs text-muted">
                    {item.count} {t("landing.categories.coursesLabel")}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── FEATURED COURSES ─────────────────────────────────────── */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-card bg-banner-gradient p-8 md:p-12">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-neu-extruded-sm mb-4">
                  <Video className="h-4 w-4 text-accent-secondary" />
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                    {t("landing.featuredCourses.eyebrow")}
                  </span>
                </div>
                <h2 className="font-display text-4xl font-extrabold md:text-5xl text-foreground">
                  {t("landing.featuredCourses.title")}
                </h2>
                <p className="mt-3 max-w-xl font-body text-muted">{t("landing.featuredCourses.subtitle")}</p>
              </div>
              <NeuButton asChild>
                <Link href="/register">{t("landing.featuredCourses.viewAll")}</Link>
              </NeuButton>
            </div>
          </Reveal>

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {featuredCourseItems.map((course) => (
              <NeuCard
                key={course.title}
                className="overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-neu-extruded-hover"
              >
                <div className={cn("relative flex h-36 items-center justify-center", toneThumb[course.tone])}>
                  <course.icon className="h-12 w-12 opacity-80" aria-hidden />
                  <span className="absolute right-3 top-3 rounded-full bg-background px-3 py-1 font-display text-xs font-bold text-foreground shadow-neu-extruded-sm">
                    {course.free ? t("landing.featuredCourses.free") : course.price}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold leading-snug text-foreground">{course.title}</h3>
                  <div className="mt-3 flex items-center gap-2">
                    <NeuAvatar name={course.instructor} />
                    <p className="font-body text-sm text-muted">
                      {t("landing.featuredCourses.by")} {course.instructor}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 border-t border-black/5 pt-4">
                    <Star className="h-4 w-4 fill-badge-amber text-badge-amber" aria-hidden />
                    <span className="font-display text-sm font-bold text-foreground">{course.rating}</span>
                  </div>
                </div>
              </NeuCard>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section id="features" className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
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
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {featureItems.map((f, i) => (
              <NeuCard
                key={f.titleKey}
                className={cn(
                  "group relative flex flex-col gap-4 overflow-hidden bg-gradient-to-br transition-all duration-300 hover:-translate-y-1 hover:shadow-neu-extruded-hover",
                  f.bg
                )}
              >
                {/* Feature number */}
                <span className="absolute right-4 top-4 font-display text-4xl font-extrabold text-black/4 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Label chip */}
                <span className={cn("inline-flex w-fit rounded-full px-2.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-widest", f.iconCls)}>
                  {f.label}
                </span>
                {/* Icon */}
                <div className={cn("inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110", f.iconCls)}>
                  <f.icon className="h-7 w-7" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">{t(f.titleKey)}</h3>
                  <p className="mt-2 font-body text-muted leading-relaxed">{t(f.descKey)}</p>
                </div>
              </NeuCard>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
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
          </Reveal>
          <Stagger className="grid gap-8 md:grid-cols-3" stagger={0.1}>
            {howItWorksItems.map((item) => (
              <NeuCard key={item.step}>
                <NeuWell className="inline-flex h-14 w-14 items-center justify-center mb-4">
                  <span className="font-display text-xl font-extrabold text-accent">{item.step}</span>
                </NeuWell>
                <h3 className="font-display text-xl font-bold text-foreground">{t(item.titleKey)}</h3>
                <p className="mt-2 font-body text-muted">{t(item.descKey)}</p>
              </NeuCard>
            ))}
          </Stagger>
        </div>
      </section>

            {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
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
                  OYO-Elearner brings world-class course delivery to creators, coaches, and institutions — without the LMS complexity.
                </p>
                <p className="mt-4 font-body text-muted leading-relaxed">
                  One clean platform to publish lessons, run live classes, track progress, and grow your learning community.
                </p>
              </div>
            </Reveal>
            
            <Stagger className="grid grid-cols-2 gap-6" stagger={0.08}>
              {aboutCards.map((item) => (
                <NeuCard key={item.titleKey}>
                  <NeuWell className="inline-flex p-3 mb-3">
                    <item.icon className="h-5 w-5 text-accent" />
                  </NeuWell>
                  <h3 className="font-display text-base font-bold text-foreground">{t(item.titleKey)}</h3>
                  <p className="mt-1 font-body text-sm text-muted">{t(item.descKey)}</p>
                </NeuCard>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="pricing" className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
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
          </Reveal>

          <Stagger className="grid gap-8 lg:grid-cols-3" stagger={0.1}>
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
          </Stagger>

          {/* Comparison table */}
          <Reveal>
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
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <Reveal>
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
            </Reveal>

            <Reveal delay={0.1}>
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
                  <NeuInput label={t("landing.contactSection.courseLabel")} name="course" />
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="px-4 pb-20 md:px-8">
        <Reveal>
        <div className="mx-auto max-w-7xl rounded-card bg-banner-gradient p-12 text-center shadow-neu-extruded">
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
        </Reveal>
      </section>
    </>
  );
}
