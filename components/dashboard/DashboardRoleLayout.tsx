"use client";

import { DashboardShell, type NavItem } from "@/components/dashboard/DashboardShell";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  Video,
} from "lucide-react";
import { useMemo } from "react";

type DashboardRole = "student" | "instructor" | "admin" | "superadmin";

const navConfig: Record<
  DashboardRole,
  { titleKey: string; items: { href: string; labelKey: string; icon: NavItem["icon"] }[] }
> = {
  student: {
    titleKey: "dashboard.student",
    items: [
      { href: "/dashboard/student", labelKey: "dashboard.home", icon: Home },
      { href: "/dashboard/student/courses", labelKey: "dashboard.courses", icon: BookOpen },
      { href: "/dashboard/student/assignments", labelKey: "dashboard.assignments", icon: ClipboardList },
      { href: "/dashboard/student/certificates", labelKey: "dashboard.certificates", icon: GraduationCap },
      { href: "/dashboard/student/attendance", labelKey: "dashboard.attendance", icon: Calendar },
    ],
  },
  instructor: {
    titleKey: "dashboard.instructor",
    items: [
      { href: "/dashboard/instructor", labelKey: "dashboard.home", icon: LayoutDashboard },
      { href: "/dashboard/instructor/courses", labelKey: "dashboard.courseBuilder", icon: BookOpen },
      { href: "/dashboard/instructor/live", labelKey: "dashboard.liveClasses", icon: Video },
      { href: "/dashboard/instructor/gradebook", labelKey: "dashboard.gradebook", icon: ClipboardList },
      { href: "/dashboard/instructor/ai-quiz", labelKey: "dashboard.aiQuiz", icon: GraduationCap },
    ],
  },
  admin: {
    titleKey: "dashboard.admin",
    items: [
      { href: "/dashboard/admin", labelKey: "dashboard.overview", icon: LayoutDashboard },
      { href: "/dashboard/admin/users", labelKey: "dashboard.users", icon: Users },
      { href: "/dashboard/admin/courses", labelKey: "dashboard.courses", icon: BookOpen },
      { href: "/dashboard/admin/integrations", labelKey: "dashboard.integrations", icon: Settings },
      { href: "/dashboard/admin/billing", labelKey: "dashboard.billing", icon: GraduationCap },
    ],
  },
  superadmin: {
    titleKey: "dashboard.superadmin",
    items: [
      { href: "/dashboard/superadmin", labelKey: "dashboard.platform", icon: LayoutDashboard },
      { href: "/dashboard/superadmin/institutions", labelKey: "dashboard.institutions", icon: Users },
    ],
  },
};

export function DashboardRoleLayout({
  role,
  userName,
  userImage,
  children,
}: {
  role: DashboardRole;
  userName: string;
  userImage?: string | null;
  children: React.ReactNode;
}) {
  const { t } = useLocale();
  const config = navConfig[role];

  const navItems = useMemo<NavItem[]>(
    () =>
      config.items.map((item) => ({
        href: item.href,
        label: t(item.labelKey),
        icon: item.icon,
      })),
    [config.items, t]
  );

  return (
    <DashboardShell
      title={t(config.titleKey)}
      navItems={navItems}
      userName={userName}
      userImage={userImage}
    >
      {children}
    </DashboardShell>
  );
}
