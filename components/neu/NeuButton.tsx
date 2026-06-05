import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const neuButtonVariants = cva(
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-btn px-6 py-3 font-body text-sm font-semibold transition-all duration-200 focus-neu disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white shadow-neu-extruded hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm",
        secondary:
          "bg-background text-foreground shadow-neu-extruded hover:-translate-y-0.5 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm",
        ghost:
          "bg-background text-foreground shadow-neu-extruded-sm hover:shadow-neu-extruded active:shadow-neu-inset-sm",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 min-h-[36px] px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11 p-0",
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
