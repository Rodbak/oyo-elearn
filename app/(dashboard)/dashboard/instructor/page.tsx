import { NeuStatCard } from "@/components/neu";
import { BookOpen, TrendingUp, Users } from "lucide-react";

export default function InstructorHomePage() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-extrabold">Instructor dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NeuStatCard label="Students" value="248" icon={Users} trend={12} />
        <NeuStatCard label="Completion rate" value="76%" icon={TrendingUp} trend={4} />
        <NeuStatCard label="Active courses" value="5" icon={BookOpen} />
      </div>
      <section>
        <h2 className="font-display text-xl font-bold">Submissions to grade</h2>
        <p className="mt-4 font-body text-muted">
          12 pending submissions across 3 courses.
        </p>
      </section>
    </div>
  );
}
