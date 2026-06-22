"use client";

import { RolePortalSelector } from "@/components/auth/RolePortalSelector";
import { useLocale } from "@/components/i18n";
import { NeuButton, NeuCard, NeuInput } from "@/components/neu";
import {
  type AuthPortal,
  dashboardPathForPortal,
  portalToRole,
} from "@/lib/roles";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
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

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden rounded-[2rem] bg-slate-950/95 p-10 text-white shadow-neu-extruded-sm lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent-secondary">
              {t("auth.createAccount")}
            </p>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight">
              Build your teaching or learning workspace with a modern, easy onboarding flow.
            </h2>
            <p className="mt-6 max-w-xl font-body text-base leading-7 text-slate-300">
              Create your account quickly, choose the right portal, and start publishing courses right away.
            </p>
          </div>
          <div className="space-y-5 rounded-[1.75rem] bg-slate-800/90 p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-accent-secondary">Fast setup</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Enter just a few details and access your dashboard instantly.
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-accent-secondary">Role-first access</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Pick the portal that matches your role to get relevant tools and insights.
              </p>
            </div>
          </div>
        </div>

        <NeuCard className="p-8 shadow-neu-extruded-sm">
          <h1 className="font-display text-3xl font-extrabold">{t("auth.createAccount")}</h1>
          <p className="mt-2 font-body text-sm text-muted">{t("auth.registerSubtitle")}</p>

          <div className="mt-6">
            <RolePortalSelector
              value={portal}
              onChange={setPortal}
              label={t("auth.registerAsLabel")}
            />
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <NeuInput label={t("auth.fullName")} name="name" required />
            <NeuInput label={t("auth.email")} name="email" type="email" required />
            <NeuInput
              label={t("auth.password")}
              name="password"
              type="password"
              required
              minLength={8}
            />
            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
            <NeuButton type="submit" className="w-full" disabled={loading}>
              {loading ? t("auth.creating") : t("auth.createBtn")}
            </NeuButton>
          </form>
          <p className="mt-6 text-center font-body text-sm text-muted">
            {t("auth.hasAccount")} {" "}
            <Link
              href={`/login?portal=${portal}`}
              className="text-accent font-semibold focus-neu"
            >
              {t("auth.signIn")}
            </Link>
          </p>
        </NeuCard>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const { t } = useLocale();

  return (
    <Suspense
      fallback={
        <NeuCard>
          <p className="font-body text-muted">{t("common.loading")}</p>
        </NeuCard>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
