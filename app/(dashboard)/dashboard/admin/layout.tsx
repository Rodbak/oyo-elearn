import { DashboardRoleLayout } from "@/components/dashboard/DashboardRoleLayout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <DashboardRoleLayout
      role="admin"
      userName={session.user.name ?? "Admin"}
      userImage={session.user.image}
    >
      {children}
    </DashboardRoleLayout>
  );
}
