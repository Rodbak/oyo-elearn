"use client";

import { useLocale } from "@/components/i18n";
import type { AuthPortal } from "@/lib/roles";
import { GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const portalOptions: {
  id: AuthPortal;
  labelKey: string;
  desc: string;
  icon: React.ElementType;
  iconStyle: string;
}[] = [
  {
    id: "STUDENT",
    labelKey: "auth.portalLearner",
    desc: "Access courses, track progress & earn certificates",
    icon: GraduationCap,
    iconStyle: "bg-badge-sky/15 text-badge-sky",
  },
  {
    id: "INSTRUCTOR",
    labelKey: "auth.portalCreator",
    desc: "Build courses, teach students & manage content",
    icon: Briefcase,
    iconStyle: "bg-badge-violet/15 text-badge-violet",
  },
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
    <div className="space-y-3">
      <p className="font-body text-sm font-medium text-foreground">
        {label ?? t("auth.signInAsLabel")}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {portalOptions.map((option) => {
          const isActive = value === option.id;
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "relative flex flex-col items-center gap-3 rounded-card border-2 p-4 text-center transition-all duration-200 focus-neu",
                isActive
                  ? "border-accent bg-accent/5 shadow-neu-extruded"
                  : "border-surface-border bg-background shadow-neu-extruded-sm hover:border-accent/40 hover:shadow-neu-extruded"
              )}
            >
              {/* Active dot indicator */}
              {isActive && (
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent" />
              )}

              {/* Icon badge */}
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
                  isActive ? "bg-accent/15 text-accent" : option.iconStyle
                )}
              >
                <Icon className="h-6 w-6" />
              </div>

              {/* Label */}
              <div>
                <p
                  className={cn(
                    "font-display text-sm font-bold leading-tight",
                    isActive ? "text-accent" : "text-foreground"
                  )}
                >
                  {t(option.labelKey)}
                </p>
                <p className="mt-0.5 font-body text-xs leading-snug text-muted">
                  {option.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
