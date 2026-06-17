import { NeuCard } from "./NeuCard";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

const toneStyles = {
  accent: "bg-accent/10 text-accent",
  coral: "bg-badge-coral/10 text-badge-coral",
  amber: "bg-badge-amber/10 text-badge-amber",
  violet: "bg-badge-violet/10 text-badge-violet",
  sky: "bg-badge-sky/10 text-badge-sky",
  mint: "bg-badge-mint/10 text-badge-mint",
} as const;

export function NeuStatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  tone = "accent",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  /** Icon badge color — defaults to the brand accent for backward compatibility. */
  tone?: keyof typeof toneStyles;
}) {
  const positive = trend !== undefined && trend >= 0;

  return (
    <NeuCard className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", toneStyles[tone])}>
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        {trend !== undefined && (
          <span
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              positive ? "text-accent-secondary" : "text-red-500"
            )}
          >
            {positive ? (
              <TrendingUp className="h-4 w-4" aria-hidden />
            ) : (
              <TrendingDown className="h-4 w-4" aria-hidden />
            )}
            {Math.abs(trend)}%
            {trendLabel && <span className="text-muted font-normal">{trendLabel}</span>}
          </span>
        )}
      </div>
      <div>
        <p className="font-body text-sm text-muted">{label}</p>
        <p className="font-display text-3xl font-extrabold text-foreground">
          <AnimatedCounter value={value} />
        </p>
      </div>
    </NeuCard>
  );
}
