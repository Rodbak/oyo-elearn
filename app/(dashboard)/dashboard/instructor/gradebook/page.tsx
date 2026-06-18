import { NeuButton, NeuCard, NeuBadge } from "@/components/neu";
import { BarChart3 } from "lucide-react";

const rows = [
  { student: "Ada Okonkwo",   assignment: "Essay: AI in Education",  course: "Intro to CS",        submitted: "Jun 2",  status: "pending" },
  { student: "Kofi Mensah",   assignment: "Problem set 3",           course: "Math for Engineers", submitted: "Jun 1",  status: "pending" },
  { student: "Amara Diallo",  assignment: "React final project",     course: "Web Development",    submitted: "Jun 3",  status: "pending" },
  { student: "Lois Bentil",   assignment: "Quiz retake",             course: "Intro to CS",        submitted: "May 28", status: "graded", grade: 78 },
  { student: "Seun Adeyemi",  assignment: "Problem set 2",           course: "Math for Engineers", submitted: "May 25", status: "graded", grade: 92 },
];

export default function GradebookPage() {
  const pending = rows.filter(r => r.status === "pending");

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge-violet/10">
          <BarChart3 className="h-5 w-5 text-badge-violet" aria-hidden />
        </div>
        <div>
          <h1 className="font-display text-2xl font-extrabold">Gradebook</h1>
          <p className="font-body text-sm text-muted">{pending.length} submissions pending review</p>
        </div>
      </div>

      {/* Mobile-friendly card list for small screens */}
      <div className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <NeuCard key={`${r.student}-${r.assignment}`} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-display text-sm font-bold truncate">{r.student}</p>
                <p className="mt-0.5 font-body text-xs text-muted truncate">{r.assignment}</p>
                <p className="font-body text-xs text-muted">{r.course} · {r.submitted}</p>
              </div>
              <div className="shrink-0">
                {r.status === "graded" ? (
                  <NeuBadge variant="success">{r.grade}%</NeuBadge>
                ) : (
                  <NeuButton size="sm">Grade</NeuButton>
                )}
              </div>
            </div>
          </NeuCard>
        ))}
      </div>

      {/* Table for larger screens */}
      <NeuCard className="hidden sm:block overflow-x-auto p-0">
        <table className="w-full font-body text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left">
              <th className="px-5 py-3.5 font-semibold text-muted">Student</th>
              <th className="px-5 py-3.5 font-semibold text-muted">Assignment</th>
              <th className="px-5 py-3.5 font-semibold text-muted hidden md:table-cell">Course</th>
              <th className="px-5 py-3.5 font-semibold text-muted hidden lg:table-cell">Submitted</th>
              <th className="px-5 py-3.5 font-semibold text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.student}-${r.assignment}`} className="border-b border-black/4 last:border-0 hover:bg-[#F8F9FC] transition-colors">
                <td className="px-5 py-3.5 font-medium">{r.student}</td>
                <td className="px-5 py-3.5 text-muted max-w-[200px] truncate">{r.assignment}</td>
                <td className="px-5 py-3.5 text-muted hidden md:table-cell">{r.course}</td>
                <td className="px-5 py-3.5 text-muted hidden lg:table-cell">{r.submitted}</td>
                <td className="px-5 py-3.5">
                  {r.status === "graded" ? (
                    <NeuBadge variant="success">{r.grade}%</NeuBadge>
                  ) : (
                    <NeuButton size="sm">Grade</NeuButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </NeuCard>
    </div>
  );
}
