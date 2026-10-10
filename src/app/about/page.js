import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Heart, MessageCircle, ShieldCheck, Sparkles, Store, Users } from "lucide-react";

export const metadata = {
  title: "About Us | Pathak Jee General Store",
  description:
    "Learn about Pathak Jee General Store — our journey since 2015, commitment to fresh daily groceries, honest local pricing, and neighbourhood service.",
};

const storePhotos = [
  { src: "/hero1.jpg", title: "Daily Fresh Dairy & Essentials", tag: "Morning Restock" },
  { src: "/banner1.jpg", title: "Spacious Aisles & Wide Variety", tag: "Main Aisle" },
  { src: "/snacks2.jpg", title: "Snacks, Namkeen & Biscuits", tag: "Snack Corner" },
  { src: "/bewarages.jpg", title: "Tea, Coffee & Cold Beverages", tag: "Beverage Section" },
  { src: "/essentials.jpg", title: "Rice, Flour & Cooking Grains", tag: "Staples" },
  { src: "/hero6.jpg", title: "Fresh Eggs & Farm Supplies", tag: "Fresh Farm" },
];

const faqs = [
  {
    q: "How can I order groceries for home delivery?",
    a: "You can simply message us on WhatsApp (+91 9650500935) with your list or click 'Order' on any product. You can even send a photo of your handwritten grocery list!",
  },
  {
    q: "What are the store operating hours?",
    a: "We are open 7 days a week from 7:00 AM in the morning to 10:00 PM at night. Fresh milk arrives daily before 7:00 AM.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI (Google Pay, PhonePe, Paytm), Cash on Delivery, and direct bank transfers for regular monthly household accounts.",
  },
  {
    q: "Are the prices listed on this website accurate?",
    a: "Yes! We update rates regularly with current store MRPs. If market prices fluctuate for wholesale items like pulses or oil, we confirm them before dispatching.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      
      {/* 1. Header Banner */}
      <section className="relative bg-slate-900 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/banner2.jpg"
            alt="Store background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
        
        <div className="container-page relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Serving Since 2015</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Our Story, Our Promise &amp; Our Neighbourhood
          </h1>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Pathak Jee General Store was born from a simple promise: to serve our local community with wholesome groceries, fair rates, and genuine warmth every single day.
          </p>
        </div>
      </section>

      {/* 2. Story Section with Side by Side Layout */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
                <Image
                  src="/hero3.jpg"
                  alt="Pathak Jee Store Front"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -right-3 sm:-right-6 glass-panel rounded-2xl p-4 shadow-xl border border-white/80 max-w-xs">
                <p className="text-xs font-bold text-slate-800 italic">
                  &ldquo;A grocery store isn&apos;t just shelves — it is about trust, freshness, and being there for every family&apos;s kitchen.&rdquo;
                </p>
                <p className="text-[11px] font-semibold text-orange-600 mt-2 text-right">
                  — The Pathak Family
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Rooted in Our Community
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                From A Small Counter to Your Everyday Superstore
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Over a decade ago, we opened our doors with just a few sacks of rice, fresh dairy, and pure spices. Through years of listening to our neighbours, we grew into a full-scale neighbourhood grocery hub stocking over 500 verified daily items.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We believe in straightforward honesty: no inflated price tags, no hidden margins, and no compromises on food purity. When you order from Pathak Jee Store, you get the same handpicked quality we take home to our own families.
              </p>

              <div className="pt-3 grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200">
                  <p className="text-2xl font-black text-orange-600">100%</p>
                  <p className="text-xs font-bold text-slate-800">Freshness Guaranteed</p>
                  <p className="text-[11px] text-slate-500">Stocked fresh every morning</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <p className="text-2xl font-black text-emerald-600">2,500+</p>
                  <p className="text-xs font-bold text-slate-800">Neighbourhood Families</p>
                  <p className="text-[11px] text-slate-500">Regular loyal customers</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Real Store Photo Gallery */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Inside Pathak Jee Store
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              A Glimpse into Our Shelves
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Clean aisles, well-organized departments, and authentic products ready for your kitchen.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {storePhotos.map((photo, index) => (
              <div
                key={index}
                className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white mb-1">
                    {photo.tag}
                  </span>
                  <p className="text-xs sm:text-sm font-bold drop-shadow-xs line-clamp-1">
                    {photo.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-page max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600">
              Everything you need to know about our services, ordering, and timings.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 p-5 bg-slate-50/50 hover:bg-white transition-colors shadow-2xs"
              >
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0">
                    Q
                  </span>
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm text-slate-600 pl-8 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-600 mb-3">Have more questions or need a special item?</p>
            <a
              href="https://wa.me/919650500935"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message Us on WhatsApp (+91 9650500935)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
