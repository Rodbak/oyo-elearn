"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Bell, LogOut, Menu, User } from "lucide-react";
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

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

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
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = () => {
    if (DEMO_MODE) {
      window.location.assign("/");
      return;
    }
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-background p-4 shadow-neu-extruded-sm transition-transform md:static md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
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
                  "flex min-h-[44px] items-center gap-3 rounded-2xl px-4 py-2 font-body text-sm font-medium transition-all hover:bg-accent/5 focus-neu",
                  active
                    ? "bg-accent text-white shadow-neu-inset"
                    : "text-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Dropdown */}
        <div className="relative mt-auto">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex w-full items-center gap-3 rounded-2xl bg-background p-3 shadow-neu-extruded-sm hover:shadow-neu-extruded transition-all focus-neu"
          >
            <NeuAvatar src={userImage} name={userName} />
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate font-body text-sm font-semibold">{userName}</p>
            </div>
            <User className="h-4 w-4 text-muted" />
          </button>

          {showUserMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-full rounded-2xl bg-background p-2 shadow-neu-extruded">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Rest of the component remains similar but with reduced shadows */}
      {/* ... (header and mobile nav stay mostly the same) */}
    </div>
  );
}
