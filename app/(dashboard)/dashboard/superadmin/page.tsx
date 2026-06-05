import { NeuStatCard } from "@/components/neu";
import { Building2, DollarSign, Users } from "lucide-react";

export default function SuperAdminPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-extrabold">Platform analytics</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        <NeuStatCard label="MRR" value="$48.2k" icon={DollarSign} trend={6} />
        <NeuStatCard label="Institutions" value="156" icon={Building2} trend={3} />
        <NeuStatCard label="Active users" value="12.4k" icon={Users} trend={9} />
      </div>
    </div>
  );
}
