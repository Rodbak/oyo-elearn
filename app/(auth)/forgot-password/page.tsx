"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuButton, NeuCard, NeuInput } from "@/components/neu";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { t } = useLocale();

  return (
    <NeuCard>
      <h1 className="font-display text-3xl font-extrabold">{t("auth.resetTitle")}</h1>
      <p className="mt-2 font-body text-sm text-muted">{t("auth.resetSubtitle")}</p>
      <form className="mt-8 space-y-5" action="#">
        <NeuInput label={t("auth.email")} name="email" type="email" required />
        <NeuButton type="submit" className="w-full">
          {t("auth.sendReset")}
        </NeuButton>
      </form>
      <p className="mt-6 text-center font-body text-sm text-muted">
        <Link href="/login" className="text-accent font-semibold focus-neu">
          {t("auth.backToSignIn")}
        </Link>
      </p>
    </NeuCard>
  );
}
