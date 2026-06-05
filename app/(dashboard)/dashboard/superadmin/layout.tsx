import { DashboardRoleLayout } from "@/components/dashboard/DashboardRoleLayout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <DashboardRoleLayout
      role="superadmin"
      userName={session.user.name ?? "Super Admin"}
      userImage={session.user.image}
    >
      {children}
    </DashboardRoleLayout>
  );
}
