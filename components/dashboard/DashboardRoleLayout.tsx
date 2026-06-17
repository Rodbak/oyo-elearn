"use client";

import {
  BarChart3,
  BookOpen,
  Building2,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  GraduationCap,
  Home,
  Plug,
  Radio,
  Sparkles,
  Users,
} from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { DashboardShell, type NavItem } from "@/components/dashboard/DashboardShell";

export type DashboardRole = "student" | "instructor" | "admin" | "superadmin";

interface NavItemConfig {
  href: string;
  labelKey: string;
  icon: NavItem["icon"];
}

interface RoleConfig {
  titleKey: string;
  items: NavItemConfig[];
}

const ROLE_NAV: Record<DashboardRole, RoleConfig> = {
  student: {
    titleKey: "dashboard.student",
    items: [
      { href: "/dashboard/student", labelKey: "dashboard.home", icon: Home },
      { href: "/dashboard/student/courses", labelKey: "dashboard.courses", icon: BookOpen },
      { href: "/dashboard/student/assignments", labelKey: "dashboard.assignments", icon: ClipboardList },
      { href: "/dashboard/student/certificates", labelKey: "dashboard.certificates", icon: GraduationCap },
      { href: "/dashboard/student/attendance", labelKey: "dashboard.attendance", icon: CalendarCheck },
    ],
  },
  instructor: {
    titleKey: "dashboard.instructor",
    items: [
      { href: "/dashboard/instructor", labelKey: "dashboard.home", icon: Home },
      { href: "/dashboard/instructor/courses", labelKey: "dashboard.courseBuilder", icon: BookOpen },
      { href: "/dashboard/instructor/live", labelKey: "dashboard.liveClasses", icon: Radio },
      { href: "/dashboard/instructor/gradebook", labelKey: "dashboard.gradebook", icon: BarChart3 },
      { href: "/dashboard/instructor/ai-quiz", labelKey: "dashboard.aiQuiz", icon: Sparkles },
    ],
  },
  admin: {
    titleKey: "dashboard.admin",
    items: [
      { href: "/dashboard/admin", labelKey: "dashboard.home", icon: Home },
      { href: "/dashboard/admin/users", labelKey: "dashboard.users", icon: Users },
      { href: "/dashboard/admin/courses", labelKey: "dashboard.courses", icon: BookOpen },
      { href: "/dashboard/admin/integrations", labelKey: "dashboard.integrations", icon: Plug },
      { href: "/dashboard/admin/billing", labelKey: "dashboard.billing", icon: CreditCard },
    ],
  },
  superadmin: {
    titleKey: "dashboard.superadmin",
    items: [
      { href: "/dashboard/superadmin", labelKey: "dashboard.home", icon: Home },
      { href: "/dashboard/superadmin/institutions", labelKey: "dashboard.institutions", icon: Building2 },
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
  const config = ROLE_NAV[role];

  const navItems: NavItem[] = config.items.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
    icon: item.icon,
  }));

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
