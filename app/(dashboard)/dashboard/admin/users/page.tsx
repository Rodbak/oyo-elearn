import { NeuButton, NeuCard } from "@/components/neu";

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <h1 className="font-display text-3xl font-extrabold flex-1">User management</h1>
        <NeuButton>Invite user</NeuButton>
        <NeuButton variant="secondary">CSV import</NeuButton>
      </div>
      <NeuCard>
        <p className="font-body text-muted">
          Manage instructors, students, and role assignments for your institution.
        </p>
      </NeuCard>
    </div>
  );
}
