import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/adminComponent/Navbar";
import Sidebar from "@/adminComponent/Sidebar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Pathak Jee General Store | Fresh Groceries & Daily Needs",
    template: "%s | Pathak Jee Store",
  },
  description:
    "Your trusted neighbourhood grocery store. Fresh milk, farm eggs, basmati rice, organic pulses, spices, snacks, and daily kitchen essentials with instant WhatsApp ordering and doorstep delivery.",
  keywords: [
    "grocery store",
    "kirana shop",
    "fresh milk",
    "farm eggs",
    "basmati rice",
    "pulses dal",
    "atta flour",
    "spices masala",
    "Pathak Jee Store",
  ],
};

export default function AdminLayout({ children }) {
  return (
    <div className={`${outfit.variable} ${plusJakarta.variable} flex min-h-screen bg-slate-100 text-slate-900`}>
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col bg-white">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
