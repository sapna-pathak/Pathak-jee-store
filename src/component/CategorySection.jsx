"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function CategorySection({ categories }) {
  return (
    <section className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Explore Our Departments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-2 text-slate-600 max-w-xl text-sm sm:text-base">
              Handpicked everyday essentials, freshly restocked every morning at local neighbourhood rates.
            </p>
          </div>
          
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 group shrink-0"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className={`group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5`}
            >
              {/* Image Preview Container */}
              <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                <Image
                  src={category.image || "/essentials.jpg"}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                
                {/* Gradient tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Floating Category Icon Badge */}
                <div className="absolute top-2.5 left-2.5 h-9 w-9 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-lg group-hover:rotate-6 transition-transform">
                  <span aria-hidden="true">{category.icon}</span>
                </div>

                {/* Item Count Chip */}
                <div className="absolute bottom-2 right-2.5">
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                    {category.itemCount || "In Stock"}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-3.5 sm:p-4 flex flex-col flex-grow">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {category.name}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-grow">
                  {category.description}
                </p>

                {/* Category Color Indicator Bar */}
                <div
                  className="mt-3 h-1 w-full rounded-full transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:h-1.5"
                  style={{ backgroundColor: category.color || "#ea580c" }}
                />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
