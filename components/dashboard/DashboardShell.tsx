"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Bell,
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  Video,
} from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuAvatar, NeuWell } from "@/components/neu";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function DashboardShell({
  title,
  navItems,
  userName,
  userImage,
  children,
}: {
  title: string;
  navItems: NavItem[];
  userName: string;
  userImage?: string | null;
  children: React.ReactNode;
}) {
  const { t } = useLocale();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-background p-4 shadow-neu-extruded transition-transform md:static md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <p className="font-display text-lg font-extrabold text-accent px-2">
          {title}
        </p>
        <nav className="mt-8 flex-1 space-y-1" aria-label="Dashboard">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-[44px] items-center gap-3 rounded-2xl px-4 py-2 font-body text-sm font-medium transition-all focus-neu",
                  active
                    ? "bg-background text-accent shadow-neu-inset"
                    : "text-muted shadow-neu-extruded-sm hover:shadow-neu-extruded"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 rounded-2xl bg-background p-3 shadow-neu-inset-sm">
          <NeuAvatar src={userImage} name={userName} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-body text-sm font-semibold">{userName}</p>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex h-10 w-10 items-center justify-center rounded-btn shadow-neu-extruded-sm focus-neu"
            aria-label={t("dashboard.signOut")}
          >
            <LogOut className="h-4 w-4 text-muted" />
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col md:pl-0">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-background px-4 py-4 shadow-neu-extruded-sm md:px-8">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-btn shadow-neu-extruded-sm focus-neu md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={t("dashboard.toggleSidebar")}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <NeuWell className="flex h-11 w-11 items-center justify-center p-0">
            <button type="button" aria-label="Notifications" className="focus-neu rounded-full p-2">
              <Bell className="h-5 w-5 text-muted" />
            </button>
          </NeuWell>
        </header>

        <main className="flex-1 p-4 pb-24 md:p-8 md:pb-8">{children}</main>

        <nav
          className="fixed bottom-0 left-0 right-0 flex justify-around bg-background p-2 shadow-neu-extruded md:hidden"
          aria-label={t("dashboard.mobileNav")}
        >
          {navItems.slice(0, 4).map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center rounded-btn px-2 text-xs focus-neu",
                  active ? "text-accent" : "text-muted"
                )}
              >
                <item.icon className="h-5 w-5" aria-hidden />
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
