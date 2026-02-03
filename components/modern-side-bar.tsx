"use client";
import React, { useState, useEffect } from 'react';
import { authClient } from "@/lib/auth-client"
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
  ChartColumn
} from 'lucide-react';
import { useRouter } from "next/navigation"

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
  const { data: session } = authClient.useSession();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

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

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 p-3 rounded-lg bg-white shadow-md border border-slate-100 md:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-40 transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-20" : "w-72"}
          md:translate-x-0 md:relative
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/60">
          <div className={`flex items-center space-x-2.5 ${isCollapsed ? 'mx-auto' : ''}`}>
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-base">H</span>
            </div>
            {!isCollapsed && <span className="font-semibold text-slate-800 text-base">Habit Tracker</span>}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-md hover:bg-slate-100"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <ul className="space-y-0.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`
                      w-full flex items-center px-3 py-2.5 rounded-md transition-all duration-200 group relative
                      ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}
                      ${isCollapsed ? "justify-center" : "space-x-2.5"}
                    `}
                  >
                    <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
                    {!isCollapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-medium">{item.name}</span>
                        {item.badge && <span className="px-1.5 py-0.5 text-xs bg-slate-100 rounded-full">{item.badge}</span>}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Profile & Logout */}
        <div className="mt-auto border-t border-slate-200">
          {/* <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">
              {session?.user.name?.charAt(0) ?? "U"}
            </div>
            {!isCollapsed && (
              <span className="text-sm font-medium truncate">{session?.user.name}</span>
            )}
          </div> */}
          <div className="p-3">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center text-red-600 hover:bg-red-50 rounded-md p-2.5 ${isCollapsed ? 'justify-center' : 'space-x-2.5'}`}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}