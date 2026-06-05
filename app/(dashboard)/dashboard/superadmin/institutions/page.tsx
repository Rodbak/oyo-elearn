import { NeuCard, NeuBadge } from "@/components/neu";

const institutions = [
  { name: "Lagos Academy", plan: "pro", health: "healthy" },
  { name: "Nairobi Tech", plan: "enterprise", health: "healthy" },
  { name: "Accra Vocational", plan: "free", health: "warning" },
];

export default function InstitutionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">All institutions</h1>
      <ul className="space-y-4">
        {institutions.map((i) => (
          <NeuCard key={i.name}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="font-display font-bold">{i.name}</span>
              <div className="flex gap-2">
                <NeuBadge>{i.plan}</NeuBadge>
                <NeuBadge variant={i.health === "healthy" ? "success" : "default"}>
                  {i.health}
                </NeuBadge>
              </div>
            </div>
          </NeuCard>
        ))}
      </ul>
    </div>
  );
}
