import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function NeuWell({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-background p-4 shadow-neu-inset-deep",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
