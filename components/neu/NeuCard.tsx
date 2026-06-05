import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

export interface NeuCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  inset?: boolean;
}

export const NeuCard = forwardRef<HTMLDivElement, NeuCardProps>(
  ({ className, hover = true, inset = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-card bg-background p-6 transition-all duration-300",
          inset
            ? "shadow-neu-inset-deep"
            : cn(
                "shadow-neu-extruded",
                hover &&
                  "hover:-translate-y-0.5 hover:shadow-neu-extruded-hover"
              ),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NeuCard.displayName = "NeuCard";
