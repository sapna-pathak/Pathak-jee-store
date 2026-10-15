import Link from "next/link";
import Image from "next/image";
import categories from "@/app/data/category.json";
import products from "@/app/data/product.json";
import ProductCard from "@/component/ProductCard";
import HeroSlider from "@/component/HeroSlider";
import PerksMarquee from "@/component/PerksMarquee";
import CategorySection from "@/component/CategorySection";
import AboutSection from "@/component/AboutSection";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import FloatingWhatsApp from "@/component/FloatingWhatsApp";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles, TrendingUp } from "lucide-react";

export default function Home() {
  const featured = products.filter((product) => product.featured);

  return (
    <div className="flex flex-col min-h-screen">
    <Header />
      
      {/* 1. Hero Section with Carousel & Animations */}
      <HeroSlider />

      {/* 2. Perks Ticker / Marquee Animation */}
      <PerksMarquee />

      {/* 3. Shop by Category with Distinct Color Codes */}
      <CategorySection categories={categories} />

      {/* 4. Featured / Popular Items Showcase */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 mb-2.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                <span>Customer Favorites</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Popular Daily Essentials
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-xl">
                The most loved everyday grocery staples in our neighbourhood, available at current store rates.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 group shrink-0"
            >
              <span>See All 500+ Items</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="btn-primary inline-flex text-sm sm:text-base"
            >
              <span>Explore Entire Grocery Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Magazine-Style About Section with Authentic Imagery */}
      <AboutSection />

      {/* 6. WhatsApp Express Ordering Banner */}
      <section className="py-14 sm:py-18 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/10 blur-2xl" />
        
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-emerald-100 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fastest Way to Order</span>
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Skip Typing! Send A Handwritten List on WhatsApp
              </h2>

              <p className="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed">
                Just snap a picture of your paper grocery list or type your requirements. We handpick the freshest stock, pack it securely, and deliver it straight to your doorstep.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/919650500935?text=Hello%20Pathak%20Jee%20Store%2C%20here%20is%20my%20grocery%20list%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <span>Send List on WhatsApp (+91 9650500935)</span>
                </a>

                <a
                  href="tel:+919650500935"
                  className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-5 py-3.5 rounded-full font-semibold text-sm transition"
                >
                  <span>Or Call Store Directly</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image
                  src="/hero3.jpg"
                  alt="Pathak Jee Store Delivery"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-xs font-bold text-emerald-300">Prompt Neighbourhood Delivery</p>
                  <p className="text-sm font-extrabold text-white">Within 30 Minutes</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
