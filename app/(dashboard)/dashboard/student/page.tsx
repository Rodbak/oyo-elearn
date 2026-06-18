import { auth } from "@/lib/auth";
import { ArrowRight, Award, BookOpen, ClipboardList, Radio } from "lucide-react";
import { NeuBadge, NeuCard, NeuProgressBar } from "@/components/neu";
import Link from "next/link";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function dateStr() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

const courses = [
  { id: "1", title: "Introduction to Computer Science", progress: 68, lessons: 24 },
  { id: "2", title: "Mathematics for Engineers",        progress: 42, lessons: 18 },
  { id: "3", title: "Digital Literacy",                 progress: 91, lessons: 12 },
];

const quickStats = [
  { label: "Enrolled courses", value: "3", icon: BookOpen,     bg: "from-badge-sky/20 to-badge-sky/5",     icon2: "bg-badge-sky/15 text-badge-sky",     num: "text-badge-sky"     },
  { label: "Assignments due",  value: "2", icon: ClipboardList, bg: "from-badge-coral/20 to-badge-coral/5", icon2: "bg-badge-coral/15 text-badge-coral", num: "text-badge-coral"  },
  { label: "Certificates",     value: "1", icon: Award,         bg: "from-badge-amber/20 to-badge-amber/5", icon2: "bg-badge-amber/15 text-badge-amber", num: "text-badge-amber"  },
];

const liveClasses = [
  { title: "Data Structures", time: "Today, 2:00 PM", course: "Intro to CS" },
  { title: "Algebra Review",  time: "Fri, 10:00 AM",  course: "Math for Engineers" },
];

const activity = [
  { text: "Quiz passed — Intro to CS (85%)", time: "2h ago" },
  { text: "Assignment submitted — Essay draft", time: "1d ago" },
  { text: "Certificate earned — Digital Literacy", time: "3d ago" },
];

export default async function StudentHomePage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-5">

      {/* Greeting banner */}
      <div className="rounded-card border border-accent/10 bg-gradient-to-r from-accent/8 via-white to-sunset/8 px-5 py-5 shadow-neu-extruded-sm">
        <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted">{dateStr()}</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-foreground md:text-3xl">
          {greeting()}, {firstName} 👋
        </h1>
        <p className="mt-1 font-body text-sm text-muted">You have 2 assignments due this week. Keep it up!</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {quickStats.map((s) => (
          <div key={s.label} className={`rounded-card bg-gradient-to-br ${s.bg} p-4 shadow-neu-extruded-sm`}>
            <div className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl ${s.icon2}`}>
              <s.icon className="h-4 w-4" aria-hidden />
            </div>
            <p className="font-body text-xs text-muted">{s.label}</p>
            <p className={`font-display text-2xl font-extrabold ${s.num}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Enrolled courses */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-foreground">My courses</h2>
          <Link href="/dashboard/student/courses" className="flex items-center gap-1 font-body text-sm text-accent hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link key={c.id} href={`/dashboard/student/courses/${c.id}`} className="block">
              <NeuCard className="h-full transition-all hover:-translate-y-0.5 hover:shadow-neu-extruded-hover">
                <h3 className="font-display text-sm font-bold leading-snug text-foreground">{c.title}</h3>
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between font-body text-xs">
                    <span className="text-muted">{c.lessons} lessons</span>
                    <span className="font-bold text-accent">{c.progress}%</span>
                  </div>
                  <NeuProgressBar value={c.progress} />
                </div>
              </NeuCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Live + Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <NeuCard>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-coral/10">
              <Radio className="h-4 w-4 text-badge-coral" aria-hidden />
            </div>
            <h2 className="font-display text-base font-bold">Upcoming live</h2>
          </div>
          <ul className="space-y-2">
            {liveClasses.map((lc) => (
              <li key={lc.title} className="flex items-center justify-between gap-3 rounded-xl bg-[#F8F9FC] px-3 py-2.5">
                <div className="min-w-0">
                  <p className="font-body text-sm font-medium truncate">{lc.title}</p>
                  <p className="font-body text-xs text-muted">{lc.course}</p>
                </div>
                <NeuBadge variant="accent" className="shrink-0 text-xs whitespace-nowrap">{lc.time}</NeuBadge>
              </li>
            ))}
          </ul>
        </NeuCard>

        <NeuCard>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-sky/10">
              <BookOpen className="h-4 w-4 text-badge-sky" aria-hidden />
            </div>
            <h2 className="font-display text-base font-bold">Recent activity</h2>
          </div>
          <ul className="space-y-3">
            {activity.map((a) => (
              <li key={a.text} className="flex items-start justify-between gap-3">
                <span className="font-body text-sm text-foreground leading-snug">{a.text}</span>
                <span className="font-body text-xs text-muted shrink-0 whitespace-nowrap">{a.time}</span>
              </li>
            ))}
          </ul>
        </NeuCard>
      </div>
    </div>
  );
}
