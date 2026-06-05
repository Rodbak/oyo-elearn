import Link from "next/link";
import { Calendar, Radio } from "lucide-react";
import { NeuBadge, NeuCard, NeuProgressBar } from "@/components/neu";

const enrolledCourses = [
  { id: "1", title: "Introduction to Computer Science", progress: 68 },
  { id: "2", title: "Mathematics for Engineers", progress: 42 },
  { id: "3", title: "Digital Literacy", progress: 91 },
];

const liveClasses = [
  { title: "Live: Data Structures", time: "Today, 2:00 PM" },
  { title: "Live: Algebra Review", time: "Fri, 10:00 AM" },
];

const activity = [
  { text: "Quiz passed — Intro to CS (85%)", time: "2h ago" },
  { text: "Assignment submitted — Essay draft", time: "1d ago" },
  { text: "Certificate earned — Digital Literacy", time: "3d ago" },
];

export default function StudentHomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold md:text-4xl">
          My learning
        </h1>
        <p className="mt-2 font-body text-muted">
          Track progress, join live classes, and stay on top of assignments.
        </p>
      </div>

      <section>
        <h2 className="font-display text-xl font-bold">Enrolled courses</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <NeuCard key={course.id} hover>
              <Link href={`/dashboard/student/courses/${course.id}`}>
                <h3 className="font-display font-bold">{course.title}</h3>
                <NeuProgressBar
                  className="mt-4"
                  value={course.progress}
                  label="Progress"
                />
              </Link>
            </NeuCard>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <NeuCard>
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-accent" aria-hidden />
            <h2 className="font-display text-xl font-bold">Upcoming live</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {liveClasses.map((lc) => (
              <li
                key={lc.title}
                className="flex items-center justify-between rounded-2xl bg-background p-4 shadow-neu-inset-sm"
              >
                <span className="font-body text-sm">{lc.title}</span>
                <NeuBadge variant="accent">{lc.time}</NeuBadge>
              </li>
            ))}
          </ul>
        </NeuCard>

        <NeuCard>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent-secondary" aria-hidden />
            <h2 className="font-display text-xl font-bold">Recent activity</h2>
          </div>
          <ul className="mt-4 space-y-3 font-body text-sm text-muted">
            {activity.map((a) => (
              <li key={a.text} className="flex justify-between gap-2">
                <span className="text-foreground">{a.text}</span>
                <span>{a.time}</span>
              </li>
            ))}
          </ul>
        </NeuCard>
      </div>
    </div>
  );
}
