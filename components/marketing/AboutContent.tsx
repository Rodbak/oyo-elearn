"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuCard } from "@/components/neu";

export function AboutContent() {
  const { t, dictionary } = useLocale();

  return (
    <div className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-5xl font-extrabold">{t("about.title")}</h1>
        <p className="mt-6 font-body text-lg text-muted leading-relaxed">
          {t("about.intro")}
        </p>
        <NeuCard className="mt-10">
          <h2 className="font-display text-2xl font-bold">{t("about.missionTitle")}</h2>
          <p className="mt-4 font-body text-muted leading-relaxed">{t("about.mission")}</p>
        </NeuCard>
        <NeuCard className="mt-6">
          <h2 className="font-display text-2xl font-bold">{t("about.serveTitle")}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 font-body text-muted">
            {dictionary.about.serve.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </NeuCard>
      </div>
    </div>
  );
}
