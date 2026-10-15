import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";


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
    "Pathak Jee Store"
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-amber-500 selection:text-white">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
