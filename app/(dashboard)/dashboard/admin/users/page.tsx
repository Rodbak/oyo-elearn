import { NeuBadge, NeuButton, NeuCard } from "@/components/neu";
import { Users } from "lucide-react";

const users = [
  { name: "Ada Okonkwo",   email: "ada@lagos-academy.test",   role: "Student",    status: "Active"  },
  { name: "Kofi Mensah",   email: "kofi@lagos-academy.test",  role: "Instructor", status: "Active"  },
  { name: "Amara Diallo",  email: "amara@lagos-academy.test", role: "Student",    status: "Active"  },
  { name: "Lois Bentil",   email: "lois@lagos-academy.test",  role: "Student",    status: "Invited" },
  { name: "Seun Adeyemi",  email: "seun@lagos-academy.test",  role: "Instructor", status: "Active"  },
];

const roleStyle: Record<string, string> = {
  Student:    "text-badge-sky",
  Instructor: "text-badge-violet",
  Admin:      "text-badge-amber",
};

export default function UserManagementPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge-sky/10">
            <Users className="h-5 w-5 text-badge-sky" aria-hidden />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold">User management</h1>
            <p className="font-body text-sm text-muted">{users.length} members</p>
          </div>
        </div>
        <div className="flex gap-2">
          <NeuButton size="sm">Invite user</NeuButton>
          <NeuButton size="sm" variant="secondary">CSV import</NeuButton>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 sm:hidden">
        {users.map((u) => (
          <NeuCard key={u.email} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-display text-sm font-bold truncate">{u.name}</p>
                <p className="font-body text-xs text-muted truncate">{u.email}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className={`font-body text-xs font-semibold ${roleStyle[u.role] ?? "text-muted"}`}>{u.role}</span>
                <NeuBadge variant={u.status === "Active" ? "success" : "default"}>{u.status}</NeuBadge>
              </div>
            </div>
          </NeuCard>
        ))}
      </div>

      {/* Desktop table */}
      <NeuCard className="hidden sm:block overflow-x-auto p-0">
        <table className="w-full font-body text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left">
              <th className="px-5 py-3.5 font-semibold text-muted">Name</th>
              <th className="px-5 py-3.5 font-semibold text-muted hidden md:table-cell">Email</th>
              <th className="px-5 py-3.5 font-semibold text-muted">Role</th>
              <th className="px-5 py-3.5 font-semibold text-muted">Status</th>
              <th className="px-5 py-3.5 font-semibold text-muted"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email} className="border-b border-black/4 last:border-0 hover:bg-[#F8F9FC] transition-colors">
                <td className="px-5 py-3.5 font-medium">{u.name}</td>
                <td className="px-5 py-3.5 text-muted hidden md:table-cell">{u.email}</td>
                <td className={`px-5 py-3.5 font-semibold text-xs ${roleStyle[u.role] ?? "text-muted"}`}>{u.role}</td>
                <td className="px-5 py-3.5">
                  <NeuBadge variant={u.status === "Active" ? "success" : "default"}>{u.status}</NeuBadge>
                </td>
                <td className="px-5 py-3.5">
                  <NeuButton size="sm" variant="secondary">Edit</NeuButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </NeuCard>
    </div>
  );
}
