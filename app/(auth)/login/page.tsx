"use client";

import { RolePortalSelector } from "@/components/auth/RolePortalSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuButton, NeuCard, NeuInput } from "@/components/neu";
import {
  type AuthPortal,
  dashboardPathForPortal,
} from "@/lib/roles";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [portal, setPortal] = useState<AuthPortal>("STUDENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

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
    <NeuCard>
      <h1 className="font-display text-3xl font-extrabold">{t("auth.welcomeBack")}</h1>
      <p className="mt-2 font-body text-sm text-muted">{t("auth.signInSubtitle")}</p>

      <div className="mt-6">
        <RolePortalSelector value={portal} onChange={setPortal} />
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <NeuInput label={t("auth.email")} name="email" type="email" required autoComplete="email" />
        <NeuInput
          label={t("auth.password")}
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-accent hover:underline focus-neu"
          >
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
        onClick={() =>
          signIn("google", { callbackUrl: dashboardPathForPortal(portal) })
        }
      >
        {t("auth.continueGoogle")}
      </NeuButton>
      <p className="mt-6 text-center font-body text-sm text-muted">
        {t("auth.noAccount")}{" "}
        <Link
          href={`/register?portal=${portal}`}
          className="text-accent font-semibold focus-neu"
        >
          {t("auth.registerAs")} {portalName}
        </Link>
      </p>
    </NeuCard>
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
