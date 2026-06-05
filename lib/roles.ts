import type { UserRole } from "@prisma/client";

/** Login/register portal — maps to Prisma UserRole */
export type AuthPortal = "STUDENT" | "INSTRUCTOR" | "INSTITUTION";

export const authPortalTabs = [
  { id: "STUDENT" as const, label: "Student" },
  { id: "INSTRUCTOR" as const, label: "Instructor" },
  { id: "INSTITUTION" as const, label: "Institution" },
];

export function portalToRole(portal: AuthPortal): UserRole {
  switch (portal) {
    case "STUDENT":
      return "STUDENT";
    case "INSTRUCTOR":
      return "INSTRUCTOR";
    case "INSTITUTION":
      return "INSTITUTION_ADMIN";
  }
}

export function roleMatchesPortal(role: UserRole, portal: AuthPortal): boolean {
  if (role === "SUPER_ADMIN") return true;
  return portalToRole(portal) === role;
}

export function roleToPortal(role: UserRole): AuthPortal | null {
  switch (role) {
    case "STUDENT":
    case "GUARDIAN":
      return "STUDENT";
    case "INSTRUCTOR":
      return "INSTRUCTOR";
    case "INSTITUTION_ADMIN":
      return "INSTITUTION";
    default:
      return null;
  }
}

export function dashboardPathForRole(role: UserRole): string {
  switch (role) {
    case "SUPER_ADMIN":
      return "/dashboard/superadmin";
    case "INSTITUTION_ADMIN":
      return "/dashboard/admin";
    case "INSTRUCTOR":
      return "/dashboard/instructor";
    case "STUDENT":
    case "GUARDIAN":
    default:
      return "/dashboard/student";
  }
}

export function dashboardPathForPortal(portal: AuthPortal): string {
  return dashboardPathForRole(portalToRole(portal));
}
