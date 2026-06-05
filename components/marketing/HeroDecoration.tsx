export function HeroDecoration() {
  return (
    <div
      className="relative mx-auto flex h-64 w-64 items-center justify-center md:h-80 md:w-80"
      aria-hidden
    >
      <div className="absolute h-64 w-64 animate-float rounded-full bg-background shadow-neu-extruded md:h-72 md:w-72" />
      <div
        className="absolute h-48 w-48 animate-float rounded-full bg-background shadow-neu-inset"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute h-32 w-32 animate-float rounded-full bg-background shadow-neu-extruded-sm"
        style={{ animationDelay: "1s" }}
      />
      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-neu-inset-deep">
        <span className="font-display text-2xl font-extrabold text-accent">
          OYO
        </span>
      </div>
    </div>
  );
}
