"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuButton, NeuCard, NeuInput } from "@/components/neu";
import { useState } from "react";

export function ContactContent() {
  const { t } = useLocale();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-5xl font-extrabold">{t("contact.title")}</h1>
        <p className="mt-4 font-body text-muted">{t("contact.subtitle")}</p>
        <NeuCard className="mt-8">
          {sent ? (
            <p className="font-body text-center text-accent-secondary" role="status">
              {t("contact.success")}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <NeuInput label={t("contact.name")} name="name" required />
              <NeuInput label={t("contact.email")} name="email" type="email" required />
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="font-body text-sm font-medium text-foreground"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-2xl bg-background px-4 py-3 font-body shadow-neu-inset focus:shadow-neu-inset-deep focus:ring-2 focus:ring-accent"
                />
              </div>
              <NeuButton type="submit" className="w-full">
                {t("contact.send")}
              </NeuButton>
            </form>
          )}
        </NeuCard>
      </div>
    </div>
  );
}
