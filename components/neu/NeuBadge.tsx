import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function NeuBadge({
  className,
  variant = "default",
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-neu-extruded-sm",
        variant === "success" && "text-accent-secondary",
        variant === "accent" && "text-accent",
        variant === "default" && "text-muted",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
