"use client";

import { Mail, Menu, MessageCircle, Phone, Search, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products & Rates" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact & Location" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  function onSearch(event) {
    event.preventDefault();
    const q = search.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
      {/* Top micro-announcement bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white text-xs font-medium py-1.5 px-4">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2">
          
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold tracking-wide">
              Pathak Jee Store Open: 7:00 AM – 10:00 PM • Fast Local WhatsApp Delivery!
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href="tel:+919650500935"
              className="inline-flex items-center gap-1 hover:text-amber-200 transition"
            >
              <Phone className="w-3 h-3" />
              <span>+91 9650500935</span>
            </a>
            <span className="text-white/40">|</span>
            <a
              href="mailto:pathakjee89@gmail.com"
              className="hidden md:inline-flex items-center gap-1 hover:text-amber-200 transition"
            >
              <Mail className="w-3 h-3" />
              <span>pathakjee89@gmail.com</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="container-page py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 p-1 border-2 border-orange-200 shadow-xs group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="Pathak Jee General Store"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors">
                Pathak Jee Store
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-orange-600">
                Daily Fresh Kirana &amp; Groceries
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={onSearch}
            className="hidden md:flex flex-1 max-w-md lg:max-w-lg items-center relative"
          >
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search milk, dal, rice, tea, snacks..."
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm pl-10 pr-20 py-2.5 rounded-full border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition shadow-xs"
            >
              Find
            </button>
          </form>

          {/* Desktop Nav Links & WhatsApp CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <nav>
              <ul className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`px-3 py-1.5 rounded-full transition-all ${
                          isActive
                            ? "bg-orange-50 text-orange-600 font-bold"
                            : "hover:text-orange-600 hover:bg-slate-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <a
              href="https://wa.me/919650500935?text=Hello%20Pathak%20Jee%20Store%2C%20I%20want%20to%20place%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs py-2 px-3.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Order</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="https://wa.me/919650500935"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              type="button"
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search & Navigation Drawer */}
        {open && (
          <div className="mt-3 pt-3 border-t border-slate-200 lg:hidden space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Mobile Search */}
            <form onSubmit={onSearch} className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search milk, dal, rice..."
                className="w-full bg-slate-50 pl-9 pr-16 py-2 rounded-full border border-slate-200 text-sm outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="absolute right-1 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
              >
                Search
              </button>
            </form>

            {/* Mobile Nav Links */}
            <ul className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block py-2 px-3 rounded-lg text-sm font-semibold transition ${
                        isActive
                          ? "bg-orange-50 text-orange-600 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>📞 +91 9650500935</span>
              <span>Open: 7 AM - 10 PM</span>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
