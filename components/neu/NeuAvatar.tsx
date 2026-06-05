import { cn } from "@/lib/utils";
import Image from "next/image";

export function NeuAvatar({
  src,
  name,
  size = "md",
  className,
}: {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: 32, md: 40, lg: 56 };
  const dim = sizes[size];
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-background font-display font-bold text-accent shadow-neu-extruded-sm",
        className
      )}
      style={{ width: dim, height: dim }}
      aria-label={name}
    >
      {src ? (
        <Image src={src} alt={name} width={dim} height={dim} className="object-cover" />
      ) : (
        <span className="text-sm">{initials}</span>
      )}
    </div>
  );
}
