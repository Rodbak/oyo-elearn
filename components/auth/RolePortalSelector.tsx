"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuTabBar } from "@/components/neu";
import type { AuthPortal } from "@/lib/roles";

const portalKeys: { id: AuthPortal; labelKey: string }[] = [
  { id: "STUDENT", labelKey: "auth.portalStudent" },
  { id: "INSTRUCTOR", labelKey: "auth.portalInstructor" },
  { id: "INSTITUTION", labelKey: "auth.portalInstitution" },
];

export function RolePortalSelector({
  value,
  onChange,
  label,
}: {
  value: AuthPortal;
  onChange: (portal: AuthPortal) => void;
  label?: string;
}) {
  const { t } = useLocale();

  return (
    <div className="space-y-2">
      <p className="font-body text-sm font-medium text-foreground">
        {label ?? t("auth.signInAsLabel")}
      </p>
      <NeuTabBar
        tabs={portalKeys.map((p) => ({
          id: p.id,
          label: t(p.labelKey),
        }))}
        activeId={value}
        onChange={(id) => onChange(id as AuthPortal)}
      />
    </div>
  );
}
