"use client";

import { RolePortalSelector } from "@/components/auth/RolePortalSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuButton, NeuCard, NeuInput, NeuWell } from "@/components/neu";
import { type AuthPortal, dashboardPathForPortal } from "@/lib/roles";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Copy, Check } from "lucide-react";

/* ── Demo accounts ─────────────────────────────────────────────── */
const DEMO_ACCOUNTS = [
  { role: "STUDENT",      email: "student@lagos-academy.test",    password: "password123", portal: "STUDENT"      as AuthPortal },
  { role: "INSTRUCTOR",   email: "instructor@lagos-academy.test", password: "password123", portal: "INSTRUCTOR"   as AuthPortal },
  { role: "ADMIN",        email: "admin@lagos-academy.test",      password: "password123", portal: "INSTITUTION"  as AuthPortal },
  { role: "SUPER ADMIN",  email: "superadmin@oyo.test",           password: "password123", portal: "INSTITUTION"  as AuthPortal },
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
      ? t("auth.portalStudent").toLowerCase()
      : portal === "INSTRUCTOR"
        ? t("auth.portalInstructor").toLowerCase()
        : t("auth.portalInstitution").toLowerCase();

  return (
    <div className="space-y-4">
      <NeuCard>
        <h1 className="font-display text-3xl font-extrabold">{t("auth.welcomeBack")}</h1>
        <p className="mt-2 font-body text-sm text-muted">{t("auth.signInSubtitle")}</p>

        <div className="mt-6">
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
          {t("auth.noAccount")}{" "}
          <Link href={`/register?portal=${portal}`} className="text-accent font-semibold focus-neu">
            {t("auth.registerAs")} {portalName}
          </Link>
        </p>
      </NeuCard>

      {/* Demo accounts panel */}
      <NeuCard className="shadow-neu-inset">
        <button
          type="button"
          onClick={() => setShowDemo((v) => !v)}
          className="flex w-full items-center justify-between focus-neu rounded-inner"
        >
          <div className="flex items-center gap-2">
            <NeuWell className="inline-flex p-1.5">
              <span className="text-base">🔑</span>
            </NeuWell>
            <p className="font-display text-sm font-bold text-foreground">
              {t("landing.demo.title")}
            </p>
          </div>
          <svg
            className={`h-4 w-4 text-muted transition-transform duration-200 ${showDemo ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDemo && (
          <div className="mt-4 space-y-2">
            <p className="font-body text-xs text-muted mb-3">
              {t("landing.demo.subtitle")}
            </p>
            {DEMO_ACCOUNTS.map((acc) => (
              <DemoAccountCard key={acc.email} account={acc} onUse={fillDemo} />
            ))}
            <p className="font-body text-xs text-muted text-center pt-1">
              Password for all accounts: <span className="font-semibold text-foreground">password123</span>
            </p>
          </div>
        )}
      </NeuCard>
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
