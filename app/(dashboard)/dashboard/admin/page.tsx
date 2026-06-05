import { NeuProgressBar, NeuStatCard } from "@/components/neu";
import { HardDrive, Users, BookOpen } from "lucide-react";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-extrabold">Institution overview</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        <NeuStatCard label="Active students" value="412" icon={Users} trend={8} />
        <NeuStatCard label="Published courses" value="28" icon={BookOpen} />
        <NeuStatCard label="Storage used" value="12.4 GB" icon={HardDrive} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-card bg-background p-6 shadow-neu-extruded">
          <NeuProgressBar value={82} label="Student limit (Pro: 500)" />
        </div>
        <div className="rounded-card bg-background p-6 shadow-neu-extruded">
          <NeuProgressBar value={24} label="Storage (50 GB plan)" />
        </div>
      </div>
    </div>
  );
}
