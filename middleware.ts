import { auth } from "@/lib/auth";
import { roleDashboardPaths } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { UserRole } from "@prisma/client";

const publicPaths = [
  "/",
  "/pricing",
  "/about",
  "/contact",
  "/login",
  "/register",
  "/forgot-password",
  "/verify",
];

const roleRoutes: Record<string, UserRole[]> = {
  "/dashboard/superadmin": ["SUPER_ADMIN"],
  "/dashboard/admin": ["INSTITUTION_ADMIN", "SUPER_ADMIN"],
  "/dashboard/instructor": ["INSTRUCTOR", "INSTITUTION_ADMIN", "SUPER_ADMIN"],
  "/dashboard/student": ["STUDENT", "GUARDIAN", "INSTRUCTOR", "INSTITUTION_ADMIN", "SUPER_ADMIN"],
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isPublic =
    publicPaths.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    ) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/locale");

  if (isPublic) return NextResponse.next();

  if (!req.auth?.user) {
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  const role = req.auth.user.role;

  for (const [prefix, allowed] of Object.entries(roleRoutes)) {
    if (pathname.startsWith(prefix) && !allowed.includes(role)) {
      const redirect = roleDashboardPaths[role] ?? "/dashboard/student";
      return NextResponse.redirect(new URL(redirect, req.url));
    }
  }

  if (pathname.startsWith("/api/live")) {
    const institutionPlan =
      (req.auth?.user as { plan?: string } | undefined)?.plan ?? "free";
    if (institutionPlan === "free") {
      return NextResponse.json(
        { error: "Live classes require Pro plan" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
