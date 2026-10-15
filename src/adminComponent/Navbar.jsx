"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex-1" />

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <Link
            href="/admin/profile"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition hover:bg-slate-700"
            aria-label="Open profile"
          >
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
