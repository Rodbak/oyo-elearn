import { NeuCard } from "@/components/neu";

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const heatmap = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1];

export default function StudentAttendancePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">Attendance</h1>
      <p className="font-body text-muted">Overall attendance: 87%</p>
      <NeuCard>
        <h2 className="font-display text-lg font-bold">This month</h2>
        <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-10">
          {heatmap.map((present, i) => (
            <div
              key={i}
              className={`aspect-square rounded-inner ${
                present
                  ? "bg-accent-secondary shadow-neu-extruded-sm"
                  : "bg-background shadow-neu-inset-sm"
              }`}
              title={present ? "Present" : "Absent"}
              aria-label={present ? "Present" : "Absent"}
            />
          ))}
        </div>
        <div className="mt-4 flex gap-4 font-body text-xs text-muted">
          {weeks.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </NeuCard>
    </div>
  );
}
