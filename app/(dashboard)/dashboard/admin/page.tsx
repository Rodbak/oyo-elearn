import { auth } from "@/lib/auth";
import { BookOpen, HardDrive, Users, TrendingUp } from "lucide-react";
import { NeuCard, NeuProgressBar } from "@/components/neu";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function dateStr() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

const stats = [
  { label: "Active students",    value: "412", icon: Users,     bg: "from-badge-sky/20 to-badge-sky/5",       icon2: "bg-badge-sky/15 text-badge-sky",       num: "text-badge-sky",    sub: "+8% this month" },
  { label: "Published courses",  value: "28",  icon: BookOpen,  bg: "from-badge-violet/20 to-badge-violet/5", icon2: "bg-badge-violet/15 text-badge-violet", num: "text-badge-violet", sub: "3 in review"    },
  { label: "Storage used",       value: "12.4 GB", icon: HardDrive, bg: "from-badge-amber/20 to-badge-amber/5", icon2: "bg-badge-amber/15 text-badge-amber", num: "text-badge-amber",  sub: "24% of 50 GB"   },
  { label: "Avg. completion",    value: "74%", icon: TrendingUp, bg: "from-badge-mint/20 to-badge-mint/5",    icon2: "bg-badge-mint/15 text-badge-mint",     num: "text-badge-mint",   sub: "+4% vs last month" },
];

const usageBars = [
  { label: "Student limit", sublabel: "412 / 500 (Pro plan)", value: 82, color: "text-badge-sky" },
  { label: "Storage",       sublabel: "12.4 GB / 50 GB",      value: 24, color: "text-badge-amber" },
  { label: "Courses",       sublabel: "28 / unlimited",        value: 56, color: "text-badge-violet" },
];

export default async function AdminOverviewPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-5">

      {/* Greeting */}
      <div className="rounded-card border border-accent/10 bg-gradient-to-r from-badge-sky/8 via-white to-badge-violet/8 px-5 py-5 shadow-neu-extruded-sm">
        <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted">{dateStr()}</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-foreground md:text-3xl">
          {greeting()}, {firstName} 👋
        </h1>
        <p className="mt-1 font-body text-sm text-muted">Institution overview — everything looks healthy.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-card bg-gradient-to-br ${s.bg} p-4 shadow-neu-extruded-sm`}>
            <div className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl ${s.icon2}`}>
              <s.icon className="h-4 w-4" aria-hidden />
            </div>
            <p className="font-body text-xs text-muted">{s.label}</p>
            <p className={`font-display text-xl font-extrabold ${s.num}`}>{s.value}</p>
            <p className="mt-0.5 font-body text-xs text-muted">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Usage */}
      <NeuCard>
        <h2 className="font-display text-base font-bold mb-4">Plan usage</h2>
        <div className="space-y-5">
          {usageBars.map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between font-body text-sm mb-1.5">
                <span className="font-medium text-foreground">{bar.label}</span>
                <span className="text-muted">{bar.sublabel}</span>
              </div>
              <NeuProgressBar value={bar.value} />
            </div>
          ))}
        </div>
      </NeuCard>
    </div>
  );
}
