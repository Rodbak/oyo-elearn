import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface NeuInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const NeuInput = forwardRef<HTMLInputElement, NeuInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="font-body text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full min-h-[44px] rounded-2xl bg-background px-4 py-3 font-body text-foreground placeholder:text-muted shadow-neu-inset transition-all duration-200 focus:shadow-neu-inset-deep focus:outline-none focus:ring-2 focus:ring-accent",
            error && "ring-2 ring-red-400",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
NeuInput.displayName = "NeuInput";
