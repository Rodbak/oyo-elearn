import { DashboardRoleLayout } from "@/components/dashboard/DashboardRoleLayout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <DashboardRoleLayout
      role="student"
      userName={session.user.name ?? "Student"}
      userImage={session.user.image}
    >
      {children}
    </DashboardRoleLayout>
  );
}
