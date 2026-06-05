import { NeuButton, NeuCard } from "@/components/neu";

const rows = [
  { student: "Ada O.", assignment: "Essay draft", submitted: "Jun 2" },
  { student: "Kofi M.", assignment: "Problem set 3", submitted: "Jun 1" },
];

export default function GradebookPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">Gradebook</h1>
      <NeuCard className="overflow-x-auto">
        <table className="w-full font-body text-sm">
          <thead>
            <tr className="text-left text-muted">
              <th className="pb-4 pr-4">Student</th>
              <th className="pb-4 pr-4">Assignment</th>
              <th className="pb-4 pr-4">Submitted</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.student} className="bg-background">
                <td className="py-3 pr-4">{r.student}</td>
                <td className="py-3 pr-4">{r.assignment}</td>
                <td className="py-3 pr-4 text-muted">{r.submitted}</td>
                <td className="py-3">
                  <NeuButton size="sm">Grade</NeuButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </NeuCard>
    </div>
  );
}
