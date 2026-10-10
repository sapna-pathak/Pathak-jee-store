"use client";

import { CheckCircle2, Clock, HeartHandshake, PhoneCall, ShieldCheck, Sparkles, Truck } from "lucide-react";

const perks = [
  { icon: Truck, text: "Fast 30-Min Local Delivery", color: "text-amber-500" },
  { icon: Sparkles, text: "Fresh Dairy Daily by 7:00 AM", color: "text-sky-400" },
  { icon: ShieldCheck, text: "100% Pure & Genuine Branded Items", color: "text-emerald-400" },
  { icon: PhoneCall, text: "Order via WhatsApp: +91 9650500935", color: "text-green-400" },
  { icon: CheckCircle2, text: "Wholesale & Transparent Store MRPs", color: "text-yellow-400" },
  { icon: HeartHandshake, text: "Trusted Neighbourhood Kirana Since 2015", color: "text-rose-400" },
  { icon: Clock, text: "Open 7 Days a Week: 7 AM – 10 PM", color: "text-cyan-400" },
];

export default function PerksMarquee() {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white py-3.5 border-y border-slate-800">
      <div className="flex animate-marquee items-center gap-8 whitespace-nowrap">
        {/* Double the list for infinite loop */}
        {[...perks, ...perks].map((perk, index) => {
          const Icon = perk.icon;
          return (
            <div
              key={index}
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-wide text-slate-200"
            >
              <Icon className={`w-4 h-4 ${perk.color} shrink-0`} />
              <span>{perk.text}</span>
              <span className="text-slate-600 ml-4 font-normal">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
