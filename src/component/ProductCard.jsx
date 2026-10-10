"use client";

import { MessageCircle, ShoppingBag } from "lucide-react";

const categoryTheme = {
  dairy: { badge: "bg-sky-100 text-sky-800 border-sky-200", label: "Dairy" },
  eggs: { badge: "bg-amber-100 text-amber-900 border-amber-200", label: "Eggs" },
  rice: { badge: "bg-yellow-100 text-yellow-900 border-yellow-200", label: "Rice" },
  pulses: { badge: "bg-emerald-100 text-emerald-900 border-emerald-200", label: "Pulses" },
  sugar: { badge: "bg-teal-100 text-teal-900 border-teal-200", label: "Sugar & Salt" },
  flour: { badge: "bg-orange-100 text-orange-900 border-orange-200", label: "Flour" },
  oil: { badge: "bg-amber-100 text-amber-900 border-amber-300", label: "Oil & Ghee" },
  spices: { badge: "bg-rose-100 text-rose-900 border-rose-200", label: "Spices" },
  snacks: { badge: "bg-purple-100 text-purple-900 border-purple-200", label: "Snacks" },
  beverages: { badge: "bg-indigo-100 text-indigo-900 border-indigo-200", label: "Beverages" },
};

export default function ProductCard({ product }) {
  const theme = categoryTheme[product.category] || {
    badge: "bg-slate-100 text-slate-800 border-slate-200",
    label: product.category,
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Pathak Jee Store, I would like to order:\n• Product: ${product.name} (${product.unit})\n• Price: ₹${product.price}\nPlease confirm availability and delivery.`
  );

  return (
    <article className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden p-3.5 sm:p-4">
      
      {/* Top badges: Category & Unit */}
      <div className="flex items-center justify-between gap-1.5 mb-2.5">
        <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border ${theme.badge}`}>
          {theme.label}
        </span>
        <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          {product.unit}
        </span>
      </div>

      {/* Visual Icon / Presentation Area */}
      <div className="relative flex h-28 sm:h-32 items-center justify-center rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/80 text-4xl sm:text-5xl group-hover:scale-105 transition-transform duration-300">
        <span aria-hidden="true" className="drop-shadow-xs">{product.icon}</span>
        {product.featured && (
          <span className="absolute top-2 right-2 text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-xs">
            ⭐ Popular
          </span>
        )}
      </div>

      {/* Product Title */}
      <div className="mt-3 flex-grow">
        <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Standard store pack • {product.unit}
        </p>
      </div>

      {/* Price and Instant WhatsApp Order */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Store Rate</span>
          <span className="text-lg sm:text-xl font-extrabold text-slate-900">
            ₹{product.price}
          </span>
        </div>

        <a
          href={`https://wa.me/919650500935?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Order ${product.name} on WhatsApp`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 hover:border-emerald-600 text-xs font-bold transition-all duration-200 active:scale-95 shadow-2xs shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Order</span>
        </a>
      </div>

    </article>
  );
}
