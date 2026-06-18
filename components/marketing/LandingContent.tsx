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
  { value: "1,000+", labelKey: "landing.stats.students" },
  { value: "500+", labelKey: "landing.stats.courses" },
  { value: "120+", labelKey: "landing.stats.institutions" },
  { value: "98%", labelKey: "landing.stats.completion" },
] as const;

const featureItems = [
  { icon: Video, titleKey: "landing.features.mux.title", descKey: "landing.features.mux.description", iconCls: "bg-badge-sky/15 text-badge-sky", bg: "from-badge-sky/8 to-transparent", label: "Video" },
  { icon: Radio, titleKey: "landing.features.live.title", descKey: "landing.features.live.description", iconCls: "bg-badge-coral/15 text-badge-coral", bg: "from-badge-coral/8 to-transparent", label: "Live" },
  { icon: Sparkles, titleKey: "landing.features.ai.title", descKey: "landing.features.ai.description", iconCls: "bg-badge-violet/15 text-badge-violet", bg: "from-badge-violet/8 to-transparent", label: "AI" },
  { icon: Award, titleKey: "landing.features.certs.title", descKey: "landing.features.certs.description", iconCls: "bg-badge-amber/15 text-badge-amber", bg: "from-badge-amber/8 to-transparent", label: "Certificates" },
  { icon: Globe, titleKey: "landing.features.integrations.title", descKey: "landing.features.integrations.description", iconCls: "bg-badge-mint/15 text-badge-mint", bg: "from-badge-mint/8 to-transparent", label: "Integrations" },
  { icon: Users, titleKey: "landing.features.multiTenant.title", descKey: "landing.features.multiTenant.description", iconCls: "bg-accent/10 text-accent", bg: "from-accent/8 to-transparent", label: "Multi-tenant" },
] as const;

const howItWorksItems = [
  { step: "01", titleKey: "landing.howItWorks.step1.title", descKey: "landing.howItWorks.step1.description" },
  { step: "02", titleKey: "landing.howItWorks.step2.title", descKey: "landing.howItWorks.step2.description" },
  { step: "03", titleKey: "landing.howItWorks.step3.title", descKey: "landing.howItWorks.step3.description" },
] as const;

const aboutCards = [
  { icon: GraduationCap, titleKey: "landing.about.cards.creators.title", descKey: "landing.about.cards.creators.description" },
  { icon: BookOpen, titleKey: "landing.about.cards.courses.title", descKey: "landing.about.cards.courses.description" },
  { icon: Target, titleKey: "landing.about.cards.learning.title", descKey: "landing.about.cards.learning.description" },
  { icon: Users, titleKey: "landing.about.cards.teams.title", descKey: "landing.about.cards.teams.description" },
] as const;

const contactHighlights = [
  { icon: MessageSquare, titleKey: "landing.contactSection.highlight1.title", descKey: "landing.contactSection.highlight1.description" },
  { icon: GraduationCap, titleKey: "landing.contactSection.highlight2.title", descKey: "landing.contactSection.highlight2.description" },
  { icon: Globe, titleKey: "landing.contactSection.highlight3.title", descKey: "landing.contactSection.highlight3.description" },
] as const;

const comparison = [
  { featureKey: "pricing.features.liveClasses", free: false, pro: true, enterprise: true },
  { featureKey: "pricing.features.aiTutoring", free: false, pro: true, enterprise: true },
  { featureKey: "pricing.features.scormLti", free: false, pro: true, enterprise: true },
  { featureKey: "pricing.features.googleClassroom", free: false, pro: true, enterprise: true },
  { featureKey: "pricing.features.sso", free: false, pro: false, enterprise: true },
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
  { key: "webDev", icon: Code, tone: "sky" as Tone, count: 86 },
  { key: "dataScience", icon: Database, tone: "violet" as Tone, count: 54 },
  { key: "design", icon: Palette, tone: "coral" as Tone, count: 41 },
  { key: "business", icon: Briefcase, tone: "amber" as Tone, count: 37 },
  { key: "mobileApps", icon: Smartphone, tone: "mint" as Tone, count: 29 },
  { key: "marketing", icon: Megaphone, tone: "sky" as Tone, count: 22 },
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
    { key: "free" as const, price: `${currency.symbol}0`, highlighted: false, href: "/register" },
    { key: "pro" as const, price: currency.proPrice, highlighted: true, href: "/register?plan=pro" },
    { key: "enterprise" as const, price: dictionary.pricing.enterprise.custom, highlighted: false, href: "#contact" },
  ];

  return (
    <>
      {/* HERO, TRUSTED BY, CATEGORIES, FEATURED COURSES, FEATURES, HOW IT WORKS sections remain unchanged */}

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

      {/* The rest of your file (PRICING, CONTACT, FINAL CTA) remains the same */}
      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="pricing" className="px-4 py-20 md:px-8">
        {/* ... rest of your pricing section unchanged ... */}
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="px-4 py-20 md:px-8">
        {/* ... rest of contact section unchanged ... */}
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="px-4 pb-20 md:px-8">
        {/* ... rest of final CTA unchanged ... */}
      </section>
    </>
  );
}
