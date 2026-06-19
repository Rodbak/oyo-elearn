"use client";

import { RolePortalSelector } from "@/components/auth/RolePortalSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { NeuButton, NeuCard, NeuInput } from "@/components/neu";
import { type AuthPortal, dashboardPathForPortal } from "@/lib/roles";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { GraduationCap, Radio, Award, Sparkles } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-slate-50">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">

        {/* Left: dark branding panel (visible on lg+) */}
        <aside className="relative hidden lg:flex lg:min-h-screen w-[48%] shrink-0 overflow-hidden bg-slate-950 p-12 text-white lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.35),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(255,138,101,0.22),transparent_45%)]" />

          <div className="relative z-10">
            <Link href="/" className="font-display text-2xl font-extrabold tracking-tight text-white">
              OYO<span className="text-accent">-Elearner</span>
            </Link>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">{t("auth.welcomeBack")}</p>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight">One secure login for learners, instructors, and teams.</h2>
            <p className="mt-5 text-base leading-7 text-slate-300">Access courses, live sessions, grading, and administration from a single polished portal.</p>

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

        {/* Right: form panel */}
        <main className="flex min-h-screen w-full flex-1 flex-col px-5 py-8 sm:px-8 md:px-12">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-accent lg:opacity-0">OYO<span className="text-foreground">-Elearner</span></Link>
            <LanguageSwitcher />
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 py-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">{t("auth.welcomeBack")}</p>
              <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">{t("auth.signInTitle")}</h1>
              <p className="mt-3 font-body text-muted">{t("auth.signInSubtitle")}</p>
            </div>

            <RolePortalSelector value={portal} onChange={setPortal} />

            <form onSubmit={handleSubmit} className="space-y-5">
              <NeuInput label={t("auth.email")} name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <NeuInput label={t("auth.password")} name="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-accent hover:underline focus-neu">{t("auth.forgotPassword")}</Link>
              </div>
              <NeuButton type="submit" className="w-full" disabled={loading}>{loading ? t("auth.signingIn") : t("auth.signIn")}</NeuButton>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-surface-border" />
              </div>
            </div>

            <NeuButton variant="secondary" className="w-full" type="button" onClick={() => signIn("google", { callbackUrl: dashboardPathForPortal(portal) })}>{t("auth.continueGoogle")}</NeuButton>

            <p className="text-center font-body text-sm text-muted">{t("auth.noAccount")} {" "}
              <Link href={`/register?portal=${portal}`} className="text-accent font-semibold focus-neu">{t("auth.registerAs")} {portalName}</Link>
            </p>
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
