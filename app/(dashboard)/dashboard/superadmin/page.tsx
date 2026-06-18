import { auth } from "@/lib/auth";
import { Building2, DollarSign, TrendingUp, Users } from "lucide-react";
import { NeuCard } from "@/components/neu";

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
  { label: "Monthly Revenue",  value: "$48.2k", icon: DollarSign,  bg: "from-badge-amber/20 to-badge-amber/5",   icon2: "bg-badge-amber/15 text-badge-amber",   num: "text-badge-amber",   sub: "+6% vs last month"  },
  { label: "Institutions",     value: "156",    icon: Building2,   bg: "from-badge-violet/20 to-badge-violet/5", icon2: "bg-badge-violet/15 text-badge-violet", num: "text-badge-violet",  sub: "+3 this week"       },
  { label: "Active users",     value: "12.4k",  icon: Users,       bg: "from-badge-sky/20 to-badge-sky/5",       icon2: "bg-badge-sky/15 text-badge-sky",       num: "text-badge-sky",     sub: "+9% growth"         },
  { label: "Avg. Growth",      value: "+8%",    icon: TrendingUp,  bg: "from-badge-mint/20 to-badge-mint/5",     icon2: "bg-badge-mint/15 text-badge-mint",     num: "text-badge-mint",    sub: "Platform health: good" },
];

const topInstitutions = [
  { name: "Lagos Academy",       users: 842,  plan: "Enterprise" },
  { name: "Nairobi Tech",        users: 610,  plan: "Pro"        },
  { name: "Accra Vocational",    users: 398,  plan: "Pro"        },
  { name: "Cape University",     users: 284,  plan: "Pro"        },
  { name: "Academic City",       users: 190,  plan: "Free"       },
];

export default async function SuperAdminPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-5">

      {/* Greeting */}
      <div className="rounded-card border border-accent/10 bg-gradient-to-r from-badge-amber/8 via-white to-badge-violet/8 px-5 py-5 shadow-neu-extruded-sm">
        <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted">{dateStr()}</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-foreground md:text-3xl">
          {greeting()}, {firstName} 👋
        </h1>
        <p className="mt-1 font-body text-sm text-muted">Platform is healthy. 156 institutions active across Africa.</p>
      </div>

      {/* Stats */}
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

      {/* Top institutions */}
      <NeuCard>
        <h2 className="font-display text-base font-bold mb-3">Top institutions</h2>
        <ul className="space-y-2">
          {topInstitutions.map((inst, i) => (
            <li key={inst.name} className="flex items-center gap-3 rounded-xl bg-[#F8F9FC] px-3 py-2.5">
              <span className="font-display text-xs font-bold text-muted w-4 shrink-0">#{i + 1}</span>
              <span className="font-body text-sm font-medium flex-1 min-w-0 truncate">{inst.name}</span>
              <span className="font-body text-xs text-muted shrink-0">{inst.users.toLocaleString()} users</span>
              <span className={`font-body text-xs font-semibold shrink-0 ${inst.plan === "Enterprise" ? "text-badge-amber" : inst.plan === "Pro" ? "text-badge-violet" : "text-muted"}`}>
                {inst.plan}
              </span>
            </li>
          ))}
        </ul>
      </NeuCard>
    </div>
  );
}
