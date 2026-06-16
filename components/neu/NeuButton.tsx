import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const neuButtonVariants = cva(
  "inline-flex min-h-[40px] min-w-[40px] items-center justify-center gap-2 rounded-btn px-5 py-2.5 font-body text-sm font-semibold transition-all duration-150 focus-neu disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white shadow-neu-extruded hover:bg-accent-light hover:shadow-neu-extruded-hover active:translate-y-0.5",
        secondary:
          "bg-white text-foreground border border-surface-border shadow-neu-extruded-sm hover:shadow-neu-extruded-hover active:translate-y-0.5",
        ghost:
          "bg-transparent text-foreground hover:bg-neutral-50",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 min-h-[32px] px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface NeuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neuButtonVariants> {
  asChild?: boolean;
}

export const NeuButton = forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(neuButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
NeuButton.displayName = "NeuButton";
