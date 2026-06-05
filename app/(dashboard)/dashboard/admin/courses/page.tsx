import { NeuBadge, NeuCard } from "@/components/neu";

const courses = [
  { title: "Intro to CS", status: "published" },
  { title: "Draft: Physics 101", status: "draft" },
];

export default function AdminCoursesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">Course management</h1>
      <ul className="space-y-4">
        {courses.map((c) => (
          <NeuCard key={c.title}>
            <div className="flex justify-between items-center">
              <span className="font-display font-bold">{c.title}</span>
              <NeuBadge variant={c.status === "published" ? "success" : "default"}>
                {c.status}
              </NeuBadge>
            </div>
          </NeuCard>
        ))}
      </ul>
    </div>
  );
}
