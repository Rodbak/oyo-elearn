"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "@/components/i18n";
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
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = () => {
    if (DEMO_MODE) { window.location.assign("/"); return; }
    signOut({ callbackUrl: "/" });
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const activeItem = [...navItems]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => isActive(item.href));

  // Bottom nav — cap at 5 items
  const bottomNavItems = navItems.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] overflow-x-hidden">

      {/* Mobile backdrop */}
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
            className="fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white border-r border-black/5 shadow-neu-extruded-sm transition-transform duration-300 md:static md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-accent focus-neu rounded-sm">
            OYO<span className="text-foreground">-Elearner</span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-btn p-1.5 text-muted hover:text-foreground focus-neu md:hidden"
            aria-label={t("dashboard.toggleSidebar")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Role label */}
        <div className="px-5 pt-4 pb-1">
          <span className="font-body text-[10px] font-bold uppercase tracking-widest text-muted/60">{title}</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 pt-1 pb-4 space-y-0.5" aria-label="Sidebar navigation">
          {navItems.map((item) => {
            const active = item.href === activeItem?.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "relative flex min-h-[42px] items-center gap-3 rounded-xl px-3 py-2 font-body text-sm font-medium transition-all duration-150 focus-neu",
                  active ? "text-white" : "text-muted hover:bg-accent/5 hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="dashboard-active-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-accent-light shadow-neu-inset"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <item.icon className="relative z-10 h-4 w-4 shrink-0" aria-hidden />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="relative border-t border-black/5 p-3">
          <button
            type="button"
            onClick={() => setShowUserMenu(prev => !prev)}
            className="flex w-full items-center gap-3 rounded-xl bg-[#F8F9FC] p-3 transition-all hover:bg-accent/5 focus-neu"
          >
            <NeuAvatar src={userImage} name={userName} />
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate font-body text-sm font-semibold text-foreground">{userName}</p>
              <p className="font-body text-xs text-muted">View profile</p>
            </div>
            <User className="h-3.5 w-3.5 shrink-0 text-muted" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                key="user-menu"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-3 right-3 mb-1 rounded-xl border border-black/5 bg-white p-1.5 shadow-neu-extruded"
              >
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm text-red-500 transition-all hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  {t("dashboard.signOut")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* ── Main column ──────────────────────────────────── */}
      <div className="flex min-h-screen flex-1 flex-col min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-black/5 bg-white/90 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger — for sidebar (profile/logout) on mobile */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/8 bg-white shadow-neu-extruded-sm text-muted hover:text-foreground focus-neu md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <p className="font-display text-base font-bold text-foreground truncate">
              {activeItem?.label ?? title}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher />
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-black/8 bg-white text-muted shadow-neu-extruded-sm hover:text-foreground focus-neu"
              aria-label={t("dashboard.notifications")}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sunset" aria-hidden />
            </button>
          </div>
        </header>

        {/* Page content — pb-20 on mobile to clear bottom nav */}
        <main className="flex-1 min-w-0 overflow-x-hidden px-4 py-5 pb-24 md:px-6 md:pb-6">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom tab bar ─────────────────────────── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch border-t border-black/8 bg-white/95 backdrop-blur-sm md:hidden"
        aria-label="Mobile navigation"
      >
        {bottomNavItems.map((item) => {
          const active = item.href === activeItem?.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2.5 transition-colors",
                active ? "text-accent" : "text-muted hover:text-foreground"
              )}
            >
              {active && (
                <span className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-b-full bg-accent" />
              )}
              <item.icon className="h-5 w-5 shrink-0" aria-hidden />
              <span className="font-body text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
