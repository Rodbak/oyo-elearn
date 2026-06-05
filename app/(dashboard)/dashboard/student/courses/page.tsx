import Link from "next/link";
import { NeuCard, NeuProgressBar } from "@/components/neu";

const courses = [
  { id: "1", title: "Introduction to Computer Science", progress: 68 },
  { id: "2", title: "Mathematics for Engineers", progress: 42 },
];

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">My courses</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((c) => (
          <NeuCard key={c.id}>
            <Link href={`/dashboard/student/courses/${c.id}`}>
              <h2 className="font-display font-bold">{c.title}</h2>
              <NeuProgressBar className="mt-4" value={c.progress} />
            </Link>
          </NeuCard>
        ))}
      </div>
    </div>
  );
}
