import { NeuBadge, NeuButton, NeuCard } from "@/components/neu";

const assignments = [
  {
    id: "1",
    title: "Essay: Impact of AI in education",
    due: "Jun 10, 2026",
    status: "pending",
  },
  {
    id: "2",
    title: "Problem set 3",
    due: "May 28, 2026",
    status: "graded",
    grade: 88,
  },
];

export default function StudentAssignmentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">Assignments</h1>
      <ul className="space-y-4">
        {assignments.map((a) => (
          <NeuCard key={a.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display font-bold">{a.title}</h2>
                <p className="mt-1 font-body text-sm text-muted">Due {a.due}</p>
              </div>
              {a.status === "graded" ? (
                <NeuBadge variant="success">Grade: {a.grade}%</NeuBadge>
              ) : (
                <NeuButton size="sm">Upload submission</NeuButton>
              )}
            </div>
          </NeuCard>
        ))}
      </ul>
    </div>
  );
}
