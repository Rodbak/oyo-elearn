"use client";

import { RolePortalSelector } from "@/components/auth/RolePortalSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
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
  const validPortal = ["STUDENT", "INSTRUCTOR", "INSTITUTION"].includes(
    initialPortal
  )
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

  const portalName =
    portal === "STUDENT"
      ? t("auth.portalStudent").toLowerCase()
      : portal === "INSTRUCTOR"
        ? t("auth.portalInstructor").toLowerCase()
        : t("auth.portalInstitution").toLowerCase();

  return (
    <NeuCard>
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
        {t("auth.hasAccount")}{" "}
        <Link
          href={`/login?portal=${portal}`}
          className="text-accent font-semibold focus-neu"
        >
          {t("auth.signIn")} ({portalName})
        </Link>
      </p>
    </NeuCard>
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
