"use client";

import { RolePortalSelector } from "@/components/auth/RolePortalSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { NeuButton, NeuCard, NeuInput, NeuWell } from "@/components/neu";
import { type AuthPortal, dashboardPathForPortal } from "@/lib/roles";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Copy, Check, GraduationCap, Radio, Award, Sparkles } from "lucide-react";

/* ── Demo accounts ─────────────────────────────────────────────── */
const DEMO_ACCOUNTS = [
  { role: "Student", email: "student@lagos-academy.test", password: "password123", portal: "STUDENT" as AuthPortal },
  { role: "Course teacher", email: "instructor@lagos-academy.test", password: "password123", portal: "INSTRUCTOR" as AuthPortal },
] as const;

function DemoAccountCard({
  account,
  onUse,
}: {
  account: (typeof DEMO_ACCOUNTS)[number];
  onUse: (email: string, password: string, portal: AuthPortal) => void;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(`${account.email} / ${account.password}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl bg-background p-3 shadow-neu-extruded-sm flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="font-display text-xs font-bold text-accent uppercase tracking-wide">{account.role}</p>
        <p className="font-body text-xs text-muted truncate">{account.email}</p>
      </div>
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={handleCopy}
          title="Copy credentials"
          className="flex h-8 w-8 items-center justify-center rounded-btn bg-background shadow-neu-extruded-sm hover:shadow-neu-extruded focus-neu transition-all"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-accent-secondary" /> : <Copy className="h-3.5 w-3.5 text-muted" />}
        </button>
        <button
          type="button"
          onClick={() => onUse(account.email, account.password, account.portal)}
          className="rounded-btn bg-accent px-3 py-1 font-body text-xs font-bold text-white shadow-neu-extruded-sm hover:shadow-neu-extruded focus-neu transition-all"
        >
          Use
        </button>
      </div>
    </div>
  );
}

/* ── Login form ─────────────────────────────────────────────────── */
function LoginForm() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [portal, setPortal] = useState<AuthPortal>("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  function fillDemo(demoEmail: string, demoPassword: string, demoPortal: AuthPortal) {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setPortal(demoPortal);
    setShowDemo(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const check = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, portal }),
    });
    const checkData = await check.json();

    if (!check.ok) {
      setError(checkData.message ?? t("auth.sessionFailed"));
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      portal,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError(t("auth.sessionFailed"));
      return;
    }

    const redirect =
      searchParams.get("callbackUrl") ??
      checkData.redirect ??
      dashboardPathForPortal(portal);
    router.push(redirect);
    router.refresh();
  }

  const portalName =
    portal === "STUDENT"
      ? t("auth.portalLearner").toLowerCase()
      : t("auth.portalCreator").toLowerCase();

  const highlights = [
    { icon: GraduationCap, title: "Role-aware experience", body: "Students, instructors, and teams get the tools that matter most to them." },
    { icon: Radio, title: "Live & on-demand", body: "Move smoothly between live sessions, lessons, and grading workflows." },
    { icon: Award, title: "Verifiable certificates", body: "Issue and verify completion certificates with public codes." },
  ];

  return (
    /* Full-bleed overlay so the split-screen ignores the centered auth layout */
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-slate-50">
      <div className="flex min-h-full w-full flex-col lg:flex-row">

        {/* ── Left: dark branding panel ─────────────────────────── */}
        <aside className="relative hidden w-[44%] shrink-0 overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          {/* Ambient gradients */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.35),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(255,138,101,0.22),transparent_45%)]" />

          <div className="relative z-10">
            <Link href="/" className="font-display text-2xl font-extrabold tracking-tight text-white">
              OYO<span className="text-accent">-Elearner</span>
            </Link>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              {t("auth.welcomeBack")}
            </p>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight">
              One secure login for learners, instructors, and teams.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Access courses, live sessions, grading, and administration from a single polished portal.
            </p>

            <ul className="mt-10 space-y-4">
              {highlights.map((h) => (
                <li key={h.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent ring-1 ring-white/15">
                    <h.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white">{h.title}</p>
                    <p className="mt-0.5 text-sm leading-6 text-slate-400">{h.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Built for creators, teams, and modern learning communities.
          </div>
        </aside>

        {/* ── Right: clean form panel ───────────────────────────── */}
        <main className="flex min-h-full w-full flex-1 flex-col px-5 py-8 sm:px-8 md:px-12">
          {/* Top bar: mobile logo + language switcher */}
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-accent lg:opacity-0">
              OYO<span className="text-foreground">-Elearner</span>
            </Link>
            <LanguageSwitcher />
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 py-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                {t("auth.welcomeBack")}
              </p>
              <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                {t("auth.signInTitle")}
              </h1>
              <p className="mt-3 font-body text-muted">
                {t("auth.signInSubtitle")}
              </p>
            </div>

            <RolePortalSelector value={portal} onChange={setPortal} />

            <form onSubmit={handleSubmit} className="space-y-5">
              <NeuInput
                label={t("auth.email")}
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <NeuInput
                label={t("auth.password")}
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <p className="text-sm text-red-500" role="alert">{error}</p>
              )}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-accent hover:underline focus-neu">
                  {t("auth.forgotPassword")}
                </Link>
              </div>
              <NeuButton type="submit" className="w-full" disabled={loading}>
                {loading ? t("auth.signingIn") : t("auth.signIn")}
              </NeuButton>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-surface-border" />
              </div>
            </div>

            <NeuButton
              variant="secondary"
              className="w-full"
              type="button"
              onClick={() => signIn("google", { callbackUrl: dashboardPathForPortal(portal) })}
            >
              {t("auth.continueGoogle")}
            </NeuButton>

            <p className="text-center font-body text-sm text-muted">
              {t("auth.noAccount")} {" "}
              <Link href={`/register?portal=${portal}`} className="text-accent font-semibold focus-neu">
                {t("auth.registerAs")} {portalName}
              </Link>
            </p>

            {/* Demo credentials */}
            <NeuCard className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 shadow-neu-inset">
              {t("auth.signInDescription")}
              <button
                type="button"
                onClick={() => setShowDemo((v) => !v)}
                className="mt-4 flex w-full items-center justify-between rounded-inner px-2 py-3 focus-neu"
              >
                <div className="flex items-center gap-3">
                  <NeuWell className="inline-flex p-2">
                    <span className="text-base">🔑</span>
                  </NeuWell>
                  <div className="text-left">
                    <p className="font-display text-sm font-bold text-foreground">
                      {t("auth.demoTitle")}
                    </p>
                    <p className="font-body text-xs text-muted">
                      {t("auth.demoSubtitle")}
                    </p>
                  </div>
                </div>
                <svg
                  className={`h-4 w-4 text-muted transition-transform duration-200 ${showDemo ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {showDemo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    {DEMO_ACCOUNTS.map((acc) => (
                      <DemoAccountCard key={acc.email} account={acc} onUse={fillDemo} />
                    ))}
                    <p className="font-body text-xs text-muted text-center">
                      Password for all accounts: <span className="font-semibold text-foreground">password123</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </NeuCard>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { t } = useLocale();
  return (
    <Suspense
      fallback={
        <NeuCard>
          <p className="font-body text-muted">{t("common.loading")}</p>
        </NeuCard>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
