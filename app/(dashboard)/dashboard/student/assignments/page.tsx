import { NeuBadge, NeuButton, NeuCard } from "@/components/neu";
import { ClipboardList } from "lucide-react";

const assignments = [
  { id: "1", title: "Essay: Impact of AI in education", course: "Intro to CS",          due: "Jun 10, 2026", status: "pending" },
  { id: "2", title: "Problem set 3",                    course: "Math for Engineers",    due: "May 28, 2026", status: "graded",  grade: 88 },
  { id: "3", title: "React component project",          course: "Web Development",       due: "Jun 15, 2026", status: "pending" },
];

export default function StudentAssignmentsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge-coral/10">
          <ClipboardList className="h-5 w-5 text-badge-coral" aria-hidden />
        </div>
        <div>
          <h1 className="font-display text-2xl font-extrabold">Assignments</h1>
          <p className="font-body text-sm text-muted">{assignments.filter(a => a.status === "pending").length} pending</p>
        </div>
      </div>

      <ul className="space-y-3">
        {assignments.map((a) => (
          <NeuCard key={a.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-base font-bold leading-snug">{a.title}</h2>
                <p className="mt-1 font-body text-xs text-muted">{a.course} · Due {a.due}</p>
              </div>
              <div className="shrink-0">
                {a.status === "graded" ? (
                  <NeuBadge variant="success" className="text-sm">Grade: {a.grade}%</NeuBadge>
                ) : (
                  <NeuButton size="sm">Submit</NeuButton>
                )}
              </div>
            </div>
          </NeuCard>
        ))}
      </ul>
    </div>
  );
}
