"use client";

import { RolePortalSelector } from "@/components/auth/RolePortalSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuButton, NeuCard, NeuInput, NeuWell } from "@/components/neu";
import { type AuthPortal, dashboardPathForPortal } from "@/lib/roles";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Copy, Check } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-neu-extruded">
          <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-br from-accent via-accent-light to-[#D6CEFF] opacity-95" />
          <div className="absolute right-[-120px] top-6 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-[-100px] top-24 h-48 w-48 rounded-full bg-white/20 blur-3xl" />

          <div className="relative grid gap-10 px-4 py-10 md:px-8 md:py-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="hidden rounded-[1.75rem] bg-slate-950/95 p-10 text-white shadow-neu-extruded-sm lg:flex lg:flex-col lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                  {t("auth.welcomeBack")}
                </p>
                <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight">
                  Power your learning experience with one beautiful sign-in flow.
                </h2>
                <p className="mt-6 max-w-xl font-body text-base leading-7 text-slate-300">
                  Fast access for learners and instructors with a modern portal that feels intuitive and polished.
                </p>
              </div>
              <div className="space-y-5 rounded-[1.75rem] bg-slate-800/90 p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-accent">Quick access</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Sign in once and move seamlessly between your classes, grades, and admin tools.
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-accent">Role-based dashboard</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Choose the right portal for your role and get straight to the tools you need.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-background p-8 shadow-neu-extruded-sm md:p-10">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                  {t("auth.welcomeBack")}
                </p>
                <h1 className="mt-4 font-display text-4xl font-extrabold text-foreground">
                  {t("auth.signInTitle")}
                </h1>
                <p className="mt-3 max-w-xl font-body text-muted">
                  {t("auth.signInSubtitle")}
                </p>
              </div>

              <div className="mt-2">
                <RolePortalSelector value={portal} onChange={setPortal} />
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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

              <NeuButton
                variant="secondary"
                className="mt-4 w-full"
                type="button"
                onClick={() => signIn("google", { callbackUrl: dashboardPathForPortal(portal) })}
              >
                {t("auth.continueGoogle")}
              </NeuButton>

              <p className="mt-6 text-center font-body text-sm text-muted">
                {t("auth.noAccount")} {" "}
                <Link href={`/register?portal=${portal}`} className="text-accent font-semibold focus-neu">
                  {t("auth.registerAs")} {portalName}
                </Link>
              </p>
            </div>
          </div>

          <NeuCard className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 shadow-neu-inset">
            {t("auth.signInDescription")}
            <button
              type="button"
              onClick={() => setShowDemo((v) => !v)}
              className="mt-6 flex w-full items-center justify-between rounded-inner px-3 py-4 focus-neu"
            >
              <div className="flex items-center gap-3">
                <NeuWell className="inline-flex p-2">
                  <span className="text-base">🔑</span>
                </NeuWell>
                <div>
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
