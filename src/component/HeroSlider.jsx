"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Phone, Search, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "🌿 Pure & Farm Fresh Daily",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    title: "Fresh Daily Groceries at Fair Local Prices",
    titleHighlight: "Fresh Daily Groceries",
    subtitle: "From morning fresh milk and organic pulses to premium basmati rice and handpicked spices — get transparent prices before you visit.",
    image: "/hero1.jpg",
    accentColor: "from-amber-500 to-orange-600",
    floatingCard: {
      icon: "🥛",
      title: "Fresh Morning Milk",
      desc: "Delivered daily by 7 AM",
    },
  },
  {
    id: 2,
    badge: "⚡ Instant 30-Min Local Delivery",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    title: "WhatsApp Your Grocery List — We Pack & Deliver!",
    titleHighlight: "WhatsApp Your List",
    subtitle: "Skip the heavy bags! Just send a handwritten list or voice note on WhatsApp. We pack the freshest items and send them right to your doorstep.",
    image: "/banner1.jpg",
    accentColor: "from-emerald-600 to-teal-600",
    floatingCard: {
      icon: "🛵",
      title: "Express WhatsApp Delivery",
      desc: "Order directly in 1 click",
    },
  },
  {
    id: 3,
    badge: "🍿 Evening Snacks & Chai Essentials",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    title: "Crisp Munchies, Hot Tea & Daily Sweet Treats",
    titleHighlight: "Snacks & Refreshments",
    subtitle: "Top tea leaves, crunchy namkeen, buttery biscuits, confectionery, and chilled beverages for every family gathering.",
    image: "/snacks.jpg",
    accentColor: "from-purple-600 to-indigo-600",
    floatingCard: {
      icon: "☕",
      title: "Premium Tea & Coffee",
      desc: "100% Authentic Brands",
    },
  },
];

const quickChips = [
  { label: "🥛 Fresh Milk", q: "milk" },
  { label: "🍚 Basmati Rice", q: "rice" },
  { label: "🫘 Toor Dal", q: "pulses" },
  { label: "🌾 Chakki Atta", q: "flour" },
  { label: "🫙 Desi Ghee", q: "oil" },
  { label: "🍿 Namkeen", q: "snacks" },
];

export default function HeroSlider() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  function handleSearch(e) {
    e.preventDefault();
    const q = search.trim();
    if (q) {
      router.push(`/products?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/products");
    }
  }

  const slide = slides[current];

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-amber-50/30 to-white pt-6 pb-14 lg:py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient glowing orbs */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-amber-200/25 blur-3xl" />

      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live store status & slide badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Store Open: 7 AM - 10 PM
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${slide.badgeColor} transition-all duration-300`}>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {slide.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.18] transition-all duration-300">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Quick in-hero search bar */}
            <form onSubmit={handleSearch} className="mt-6 w-full max-w-lg">
              <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-md border-2 border-orange-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 transition-all">
                <Search className="w-5 h-5 text-orange-500 ml-3.5 shrink-0" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 500+ items (e.g. Milk, Basmati, Dal, Atta)..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full transition shadow hover:shadow-md shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Category Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Popular:</span>
              {quickChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => router.push(`/products?q=${chip.q}`)}
                  className="px-2.5 py-1 bg-white hover:bg-orange-100 hover:text-orange-900 border border-slate-200 rounded-full transition shadow-2xs cursor-pointer font-medium"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link href="/products" className="btn-primary group text-sm sm:text-base">
                <span>Explore All Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="https://wa.me/919650500935?text=Hello%20Pathak%20Jee%20Store%2C%20I%20want%20to%20place%20an%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>

              <a
                href="tel:+919650500935"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-white transition text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-orange-600" />
                <span>Call Store</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200/80 pt-5 w-full max-w-lg">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">4.9 / 5.0</p>
                  <p className="text-[11px] text-slate-500">1,200+ Reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Fast Local</p>
                  <p className="text-[11px] text-slate-500">30 Min Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">100% Pure</p>
                  <p className="text-[11px] text-slate-500">Verified Brands</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Image Showcase & Floating Cards */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Main Visual Card Container */}
            <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border-4 border-white/80 transition-all duration-500">
              
              {/* Image Frame */}
              <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Gradient overlay on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10" />

                {/* Bottom slide title caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                    Pathak Jee Highlights
                  </span>
                  <p className="text-base font-bold drop-shadow leading-snug">
                    {slide.title}
                  </p>
                </div>
              </div>

              {/* Slider Navigation Arrows */}
              <button
                onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                aria-label="Previous slide"
                className="absolute left-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                aria-label="Next slide"
                className="absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Slide Dots Indicator */}
              <div className="absolute bottom-6 right-6 flex items-center gap-1.5 z-10">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === idx ? "w-6 bg-amber-400" : "w-2 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Badge 1: Top Left */}
            <div className="absolute -top-4 -left-4 sm:-left-6 glass-panel rounded-2xl p-3 shadow-xl flex items-center gap-3 animate-float border border-white/60">
              <span className="text-2xl">{slide.floatingCard.icon}</span>
              <div>
                <p className="text-xs font-bold text-slate-900">{slide.floatingCard.title}</p>
                <p className="text-[11px] text-emerald-600 font-semibold">{slide.floatingCard.desc}</p>
              </div>
            </div>

            {/* Floating Badge 2: Bottom Left */}
            <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-white/95 rounded-2xl p-3 shadow-xl flex items-center gap-2.5 border border-amber-200 animate-float-slow">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs">
                10+
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Years of Trust</p>
                <p className="text-[11px] text-slate-500">Established 2015</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
