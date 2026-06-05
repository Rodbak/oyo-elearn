import { DashboardRoleLayout } from "@/components/dashboard/DashboardRoleLayout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <DashboardRoleLayout
      role="instructor"
      userName={session.user.name ?? "Instructor"}
      userImage={session.user.image}
    >
      {children}
    </DashboardRoleLayout>
  );
}
