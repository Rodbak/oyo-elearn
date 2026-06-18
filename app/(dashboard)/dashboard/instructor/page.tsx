import { auth } from "@/lib/auth";
import { ArrowRight, BookOpen, ClipboardList, TrendingUp, Users } from "lucide-react";
import { NeuBadge, NeuButton, NeuCard } from "@/components/neu";

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
  { label: "Total students",   value: "248", icon: Users,       bg: "from-badge-sky/20 to-badge-sky/5",       icon2: "bg-badge-sky/15 text-badge-sky",       num: "text-badge-sky",    trend: "+12 this week" },
  { label: "Completion rate",  value: "76%", icon: TrendingUp,  bg: "from-badge-mint/20 to-badge-mint/5",     icon2: "bg-badge-mint/15 text-badge-mint",     num: "text-badge-mint",   trend: "+4% vs last month" },
  { label: "Active courses",   value: "5",   icon: BookOpen,    bg: "from-badge-violet/20 to-badge-violet/5", icon2: "bg-badge-violet/15 text-badge-violet", num: "text-badge-violet", trend: "3 published" },
];

const pending = [
  { student: "Ada Okonkwo",   assignment: "Essay: AI in Education",  course: "Intro to CS",           submitted: "Jun 2" },
  { student: "Kofi Mensah",   assignment: "Problem set 3",           course: "Math for Engineers",    submitted: "Jun 1" },
  { student: "Amara Diallo",  assignment: "React final project",     course: "Web Development",       submitted: "Jun 3" },
];

const courses = [
  { title: "Introduction to Computer Science", students: 98,  status: "Published" },
  { title: "Web Development Bootcamp",         students: 72,  status: "Published" },
  { title: "Data Analytics 101",               students: 45,  status: "Draft"     },
];

export default async function InstructorHomePage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-5">

      {/* Greeting */}
      <div className="rounded-card border border-accent/10 bg-gradient-to-r from-badge-violet/8 via-white to-accent/8 px-5 py-5 shadow-neu-extruded-sm">
        <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted">{dateStr()}</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-foreground md:text-3xl">
          {greeting()}, {firstName} 👋
        </h1>
        <p className="mt-1 font-body text-sm text-muted">You have 3 submissions waiting to be graded.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-card bg-gradient-to-br ${s.bg} p-4 shadow-neu-extruded-sm`}>
            <div className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl ${s.icon2}`}>
              <s.icon className="h-4 w-4" aria-hidden />
            </div>
            <p className="font-body text-xs text-muted">{s.label}</p>
            <p className={`font-display text-2xl font-extrabold ${s.num}`}>{s.value}</p>
            <p className="mt-1 font-body text-xs text-muted">{s.trend}</p>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid gap-4 lg:grid-cols-2">

        {/* Pending submissions */}
        <NeuCard>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-coral/10">
                <ClipboardList className="h-4 w-4 text-badge-coral" aria-hidden />
              </div>
              <h2 className="font-display text-base font-bold">Pending grades</h2>
            </div>
            <NeuBadge variant="accent">{pending.length}</NeuBadge>
          </div>
          <ul className="space-y-2">
            {pending.map((p) => (
              <li key={p.student} className="flex items-center justify-between gap-3 rounded-xl bg-[#F8F9FC] px-3 py-2.5">
                <div className="min-w-0">
                  <p className="font-body text-sm font-medium truncate">{p.assignment}</p>
                  <p className="font-body text-xs text-muted">{p.student} · {p.course}</p>
                </div>
                <NeuButton size="sm" className="shrink-0">Grade</NeuButton>
              </li>
            ))}
          </ul>
        </NeuCard>

        {/* My courses */}
        <NeuCard>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-violet/10">
                <BookOpen className="h-4 w-4 text-badge-violet" aria-hidden />
              </div>
              <h2 className="font-display text-base font-bold">My courses</h2>
            </div>
            <a href="/dashboard/instructor/courses" className="flex items-center gap-1 font-body text-sm text-accent hover:underline">
              Manage <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <ul className="space-y-2">
            {courses.map((c) => (
              <li key={c.title} className="flex items-center justify-between gap-3 rounded-xl bg-[#F8F9FC] px-3 py-2.5">
                <div className="min-w-0">
                  <p className="font-body text-sm font-medium truncate">{c.title}</p>
                  <p className="font-body text-xs text-muted">{c.students} students</p>
                </div>
                <NeuBadge variant={c.status === "Published" ? "success" : "default"}>{c.status}</NeuBadge>
              </li>
            ))}
          </ul>
        </NeuCard>
      </div>
    </div>
  );
}
