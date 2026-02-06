"use client";
import React, { useState, useEffect } from 'react';
import { authClient } from "@/lib/auth-client"
import { Link } from 'next-view-transitions'
import { usePathname, useRouter } from "next/navigation"
import { cn } from '@/lib/utils'
import {
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  Goal,
  ChevronLeft,
  ChevronRight,
  Bell,
  ChartColumn,
  Target
} from 'lucide-react';

interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  { id: "dashboard", name: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "progress", name: "Progress", icon: ChartColumn, href: "/progress" },
  { id: "challenges", name: "Challenges", icon: Goal, href: "/challenges" },
  { id: "notifications", name: "Notifications", icon: Bell, href: "/notifications", badge: "12" },
  { id: "settings", name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(true);
      else setIsOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleNavClick = (href: string) => {
    router.push(href);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-background shadow-md border border-border md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-72",
          "md:translate-x-0 md:relative",
          className
        )}
      >
        {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-sidebar-border">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-2.5 transition-opacity hover:opacity-80",
                isCollapsed && "mx-auto"
              )}
            >
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <span className="font-semibold text-sidebar-foreground text-base">
                  Habit Tracker
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-sidebar-foreground" />
              )}
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/dashboard');

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "w-full flex items-center rounded-lg transition-all duration-200 group relative",
                        "px-3 py-2.5",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isCollapsed ? "justify-center" : "gap-3"
                      )}
                    >
                      <Icon className={cn(
                        "h-5 w-5 shrink-0",
                        isActive ? "text-sidebar-primary" : "text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground"
                      )} />
                      {!isCollapsed && (
                        <div className="flex items-center justify-between w-full min-w-0">
                          <span className="text-sm font-medium truncate">{item.name}</span>
                          {item.badge && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-sidebar-primary/20 text-sidebar-primary rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                      {isActive && !isCollapsed && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Profile & Logout */}
          <div className="mt-auto border-t border-sidebar-border p-3 space-y-2">
            {/* User Profile Section */}
            {session?.user && (
              <div className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg",
                isCollapsed && "justify-center"
              )}>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">
                    {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                  </span>
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-sidebar-foreground/60 truncate">
                      {session.user.email}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center text-destructive hover:bg-destructive/10 rounded-lg p-2.5 transition-colors",
                isCollapsed ? "justify-center" : "gap-3"
              )}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
            </button>
        </div>
      </aside>
    </>
  );
}