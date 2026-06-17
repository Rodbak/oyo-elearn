"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { NeuAvatar } from "@/components/neu";
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const activeItem = navItems.find((item) => isActive(item.href));

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile backdrop — click to close the sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.button
            key="backdrop"
            type="button"
            aria-label={t("dashboard.toggleSidebar")}
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-background p-4 shadow-neu-extruded-sm transition-transform duration-300 md:static md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-2">
          <p className="font-display text-lg font-extrabold text-accent">{title}</p>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-btn p-1 text-muted hover:text-foreground focus-neu md:hidden"
            aria-label={t("dashboard.toggleSidebar")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 flex-1 space-y-1" aria-label={t("dashboard.mobileNav")}>
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "relative flex min-h-[44px] items-center gap-3 rounded-2xl px-4 py-2 font-body text-sm font-medium transition-colors focus-neu",
                  active ? "text-white" : "text-muted hover:bg-accent/5 hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="dashboard-active-pill"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent to-accent-light shadow-neu-inset"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <item.icon className="relative z-10 h-5 w-5 shrink-0" aria-hidden />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile dropdown */}
        <div className="relative mt-auto">
          <button
            type="button"
            onClick={() => setShowUserMenu((prev) => !prev)}
            className="flex w-full items-center gap-3 rounded-2xl bg-background p-3 shadow-neu-extruded-sm transition-all hover:shadow-neu-extruded focus-neu"
          >
            <NeuAvatar src={userImage} name={userName} />
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate font-body text-sm font-semibold">{userName}</p>
            </div>
            <User className="h-4 w-4 text-muted" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                key="user-menu"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 mb-2 w-full rounded-2xl bg-background p-2 shadow-neu-extruded"
              >
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition-all hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  {t("dashboard.signOut")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Main column: header + page content */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-black/5 bg-background/80 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-btn p-2 text-muted shadow-neu-extruded-sm hover:text-foreground focus-neu md:hidden"
              aria-label={t("dashboard.toggleSidebar")}
            >
              <Menu className="h-5 w-5" />
            </button>
            <p className="font-display text-base font-bold text-foreground md:text-lg">
              {activeItem?.label ?? title}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              className="relative rounded-btn p-2 text-muted shadow-neu-extruded-sm hover:text-foreground focus-neu"
              aria-label={t("dashboard.notifications")}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sunset" aria-hidden />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
