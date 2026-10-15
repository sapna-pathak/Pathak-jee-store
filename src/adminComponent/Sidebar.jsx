"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingCart,
  Tag,
  Users,
  Settings,
} from "lucide-react";
import { getStoredAuth } from "@/utils/auth";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar({ onLogout = () => {} }) {
  const pathname = usePathname();
  const [role, setRole] = useState("admin");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    setRole(getStoredAuth()?.role ?? "admin");
  }, []);

  const visibleLinks = useMemo(() => {
    return navItems.filter((item) => {
      if (role === "storeManager") {
        return ["/admin", "/admin/orders", "/admin/products", "/admin/settings"].includes(item.href);
      }
      return true;
    });
  }, [role]);

  const isCurrentPath = (href) => {
    if (href === "/admin") return pathname === "/admin" || pathname.startsWith("/admin/") === false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleDropdown = (href) => {
    setOpenDropdowns((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const showLabels = isMobileOpen || !isCollapsed;

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-lg text-white shadow-lg md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <aside
        className={`fixed left-0 top-0 z-30 flex h-screen flex-col overflow-hidden border-r border-slate-800 bg-slate-950 text-white shadow-2xl transition-all duration-300 md:sticky ${
          isMobileOpen ? "w-64 translate-x-0" : isCollapsed ? "w-20 -translate-x-full md:translate-x-0" : "w-64 translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            <span
              className={`overflow-hidden whitespace-nowrap text-lg font-bold transition-all duration-300 ${
                showLabels ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Pathak Jee Store
            </span>
          </div>

          <button
            type="button"
            className="hidden rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300 md:inline-flex"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "»" : "«"}
          </button>

          <button
            type="button"
            className="ml-auto text-xl text-white md:hidden"
            aria-label="Close sidebar"
            onClick={() => setIsMobileOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto px-2">
          {visibleLinks.map((item) => {
            const Icon = item.icon;
            const itemIsActive = isCurrentPath(item.href);
            const isDropdownOpen = openDropdowns[item.href];

            return (
              <div key={item.href} className="mb-1">
                <Link
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
                    itemIsActive ? "bg-slate-800 text-orange-400" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className="flex items-center gap-3 overflow-hidden">
                    <Icon size={20} />
                    <span
                      className={`whitespace-nowrap transition-all duration-300 ${
                        showLabels ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0"
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>

                  {item.href === "/admin" ? null : (
                    <span className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
                      <ChevronDown size={16} />
                    </span>
                  )}
                </Link>

                {item.href !== "/admin" && itemIsActive && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-slate-700 pl-3 text-xs text-slate-300">
                    <Link href={`${item.href}/overview`} className="block rounded px-2 py-1.5 hover:bg-slate-800 hover:text-white">
                      Overview
                    </Link>
                    <Link href={`${item.href}/details`} className="block rounded px-2 py-1.5 hover:bg-slate-800 hover:text-white">
                      Details
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-3">
          <button
            type="button"
            onClick={() => {
              onLogout();
              setIsMobileOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={18} />
            <span
              className={`whitespace-nowrap transition-all duration-300 ${
                showLabels ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
