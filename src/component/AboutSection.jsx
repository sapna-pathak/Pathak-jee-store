"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HeartHandshake, MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Daily Fresh Farm Arrivals",
    desc: "Milk, curd, fresh paneer, and eggs arrive every morning before 7:00 AM.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine Branded Items",
    desc: "Only sealed, authentic brands from trusted manufacturers and verified distributors.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Truck,
    title: "30-Min Local Doorstep Delivery",
    desc: "Send your grocery list on WhatsApp and get everything packed & delivered promptly.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: HeartHandshake,
    title: "Fair Rates & Personal Touch",
    desc: "Transparent local store pricing with honest discounts on household bulk staples.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
];

const stats = [
  { value: "10+", label: "Years of Trust", sub: "Serving since 2015" },
  { value: "500+", label: "Daily Essentials", sub: "In stock daily" },
  { value: "2,500+", label: "Happy Families", sub: "Neighbourhood homes" },
  { value: "30 min", label: "Fast Delivery", sub: "Straight to doorstep" },
];

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative grid grid-cols-2 gap-4">
              
              {/* Image 1: Main store photo */}
              <div className="col-span-2 relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/banner1.jpg"
                  alt="Pathak Jee General Store Interior"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Our Pride</p>
                  <p className="text-lg font-bold">Fully Stocked Everyday Aisle</p>
                </div>
              </div>

              {/* Image 2: Essentials & Dals */}
              <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src="/essentials2.jpg"
                  alt="Fresh Grains and Pulses"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
                  🌾 Pure Grains & Dals
                </div>
              </div>

              {/* Image 3: Snacks and Refreshments */}
              <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src="/snacks3.jpg"
                  alt="Snacks and Tea Aisles"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
                  🍿 Snacks & Tea
                </div>
              </div>

            </div>

            {/* Floating Experience Badge */}
            <div className="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 bg-gradient-to-br from-amber-500 to-orange-600 text-white p-5 rounded-2xl shadow-2xl border-4 border-white animate-float hidden sm:block">
              <p className="text-3xl font-black leading-none">10+</p>
              <p className="text-xs font-semibold tracking-wide uppercase mt-1">Years of Trust</p>
              <p className="text-[10px] text-amber-100 mt-0.5">Serving with Love</p>
            </div>
          </div>

          {/* Right Column: Story & Trust Pillars */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>About Pathak Jee General Store</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              More Than A Kirana — We Are Your Neighbourhood Family
            </h2>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded with the simple belief that every household deserves fresh, pure, and honestly priced groceries,
              <strong className="text-slate-900 font-semibold"> Pathak Jee General Store </strong> 
              has been a staple of the local community for over a decade. Whether it&apos;s your early morning packet of fresh milk, 
              fragrant Basmati rice, or evening chai snacks, we take pride in knowing your preferences.
            </p>

            {/* 4 Pillars Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className={`p-1.5 rounded-lg ${val.bg}`}>
                        <Icon className={`w-4 h-4 ${val.color}`} />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">{val.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed pl-8">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Call to action row */}
            <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="btn-primary text-sm font-semibold group"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="https://wa.me/919650500935?text=Hello%20Pathak%20Jee%20Store%2C%20I%20have%20a%20question"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask Us on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-14 sm:mt-18 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs">
          {stats.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-orange-600 font-heading">
                {item.value}
              </p>
              <p className="text-sm font-bold text-slate-900 mt-1">
                {item.label}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {item.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
