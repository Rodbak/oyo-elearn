import { NeuCard } from "./NeuCard";
import { NeuWell } from "./NeuWell";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

export function NeuStatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
}) {
  const positive = trend !== undefined && trend >= 0;

  return (
    <NeuCard className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <NeuWell className="p-3">
          <Icon className="h-6 w-6 text-accent" aria-hidden />
        </NeuWell>
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
            {trendLabel && (
              <span className="text-muted font-normal">{trendLabel}</span>
            )}
          </span>
        )}
      </div>
      <div>
        <p className="font-body text-sm text-muted">{label}</p>
        <p className="font-display text-3xl font-extrabold text-foreground">
          {value}
        </p>
      </div>
    </NeuCard>
  );
}
