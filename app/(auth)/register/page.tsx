"use client";

import { RolePortalSelector } from "@/components/auth/RolePortalSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { NeuButton, NeuInput } from "@/components/neu";
import {
  type AuthPortal,
  dashboardPathForPortal,
  portalToRole,
} from "@/lib/roles";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useCallback } from "react";
import { GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";

function RegisterForm() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPortal =
    (searchParams.get("portal") as AuthPortal | null) ?? "STUDENT";
  const validPortal = ["STUDENT", "INSTRUCTOR"].includes(initialPortal)
    ? initialPortal
    : "STUDENT";

  const [portal, setPortal] = useState<AuthPortal>(validPortal);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateName = useCallback((v: string) => v.trim().length >= 2, []);
  const validateEmail = useCallback((v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), []);
  const validatePassword = useCallback((v: string) => v.length >= 8, []);

  const nameError = touched.name && !validateName(name) ? t("auth.fullNameRequired") : "";
  const emailError = touched.email && !validateEmail(email) ? t("auth.emailRequired") : "";
  const passwordError = touched.password && !validatePassword(password) ? t("auth.passwordRequired") : "";

  const passwordStrength =
    password.length >= 12
      ? 100
      : password.length >= 10
      ? 75
      : password.length >= 8
      ? 50
      : password.length >= 5
      ? 25
      : password.length > 0
      ? 10
      : 0;

  const strengthLabel =
    passwordStrength >= 100
      ? t("auth.passwordStrong")
      : passwordStrength >= 50
      ? t("auth.passwordMedium")
      : passwordStrength > 0
      ? t("auth.passwordWeak")
      : "";

  const strengthColor =
    passwordStrength >= 100
      ? "bg-green-500"
      : passwordStrength >= 50
      ? "bg-yellow-500"
      : passwordStrength > 0
      ? "bg-red-400"
      : "bg-gray-200";

  const formValid =
    validateName(name) && validateEmail(email) && validatePassword(password) && agreed;

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    setError("");

    if (!formValid) return;

    setLoading(true);
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
        role: portalToRole(portal),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(
        typeof data.error === "string" ? data.error : t("auth.registerFailed")
      );
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email: form.get("email") as string,
      password: form.get("password") as string,
      portal,
      redirect: false,
    });

    setLoading(false);

    if (signInRes?.error) {
      setError(t("auth.createdSignInFailed"));
      return;
    }

    if (portal === "INSTITUTION") {
      router.push("/onboarding");
    } else {
      router.push(dashboardPathForPortal(portal));
    }
    router.refresh();
  }

  const portalName =
    portal === "STUDENT"
      ? t("auth.portalLearner").toLowerCase()
      : t("auth.portalCreator").toLowerCase();

  return (
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-slate-50">
      <div className="flex min-h-screen w-full flex-col lg:grid lg:grid-cols-2">

        {/* Left: dark branding panel */}
        <aside className="relative hidden lg:flex lg:min-h-screen h-full overflow-hidden bg-slate-950 p-12 text-white lg:flex-col lg:justify-between xl:p-16">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.35),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(255,138,101,0.22),transparent_45%)]"
            aria-hidden
          />
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-white/15">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                OYO<span className="text-accent">-Elearner</span>
              </span>
            </Link>
          </div>
          <div className="relative z-10 max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              {t("auth.createAccount")}
            </p>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight">
              {t("auth.brandHeading")}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              {t("auth.brandSubtitle")}
            </p>
            <ul className="mt-10 space-y-4">
              {[
                { title: t("auth.highlights.roleAware.title"), body: t("auth.highlights.roleAware.body") },
                { title: t("auth.highlights.liveOnDemand.title"), body: t("auth.highlights.liveOnDemand.body") },
                { title: t("auth.highlights.certificates.title"), body: t("auth.highlights.certificates.body") },
              ].map((h) => (
                <li key={h.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent ring-1 ring-white/15">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white">
                      {h.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-6 text-slate-400">
                      {h.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {t("auth.brandFooter")}
          </div>
        </aside>

        {/* Right: form panel */}
        <main className="flex min-h-screen w-full flex-col px-5 py-8 sm:px-8 md:px-12">
          <div className="mb-8 flex items-center justify-end">
            <LanguageSwitcher />
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 py-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                {t("auth.createAccount")}
              </p>
              <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                {t("auth.signInTitle")}
              </h1>
              <p className="mt-3 font-body text-muted">{t("auth.registerSubtitle")}</p>
            </div>

            <RolePortalSelector value={portal} onChange={setPortal} label={t("auth.registerAsLabel")} />

            <form onSubmit={handleSubmit} className="space-y-5">
              <NeuInput
                label={t("auth.fullName")}
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur("name")}
                error={nameError}
              />
              <NeuInput
                label={t("auth.email")}
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                error={emailError}
              />
              <NeuInput
                label={t("auth.password")}
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                error={passwordError}
              />
              {password && (
                <div className="space-y-1.5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  {strengthLabel && (
                    <p className="text-xs text-muted">{strengthLabel}</p>
                  )}
                </div>
              )}
              {error && (
                <p className="text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}
              <div className="flex items-start gap-2">
                <button
                  type="button"
                  id="terms-agree"
                  role="checkbox"
                  aria-checked={agreed}
                  onClick={() => setAgreed(!agreed)}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors focus-neu ${
                    agreed
                      ? "border-accent bg-accent text-white"
                      : "border-surface-border bg-white"
                  }`}
                >
                  {agreed && <CheckCircle2 className="h-3.5 w-3.5" />}
                </button>
                <p className="text-sm text-muted">
                  <span>I agree to the</span>{" "}
                  <Link
                    href="/terms"
                    className="text-accent hover:underline focus-neu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms of Service
                  </Link>{" "}
                  <span>and</span>{" "}
                  <Link
                    href="/privacy"
                    className="text-accent hover:underline focus-neu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
              <NeuButton
                type="submit"
                className="w-full"
                disabled={loading || !formValid}
              >
                {loading ? t("auth.creating") : t("auth.createBtn")}
              </NeuButton>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-surface-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-50 px-3 font-body text-xs uppercase tracking-widest text-muted">
                  {t("common.or")}
                </span>
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
              {t("auth.hasAccount")}{" "}
              <Link
                href={`/login?portal=${portal}`}
                className="text-accent font-semibold focus-neu"
              >
                {t("auth.signInAsLabel")} {portalName}
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const { t } = useLocale();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="font-body text-muted">{t("common.loading")}</p>
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
