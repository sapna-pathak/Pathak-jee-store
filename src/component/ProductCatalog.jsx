"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { ArrowUpDown, RotateCcw, Search, Sparkles, X } from "lucide-react";

export default function ProductCatalog({ products, categories, initialQuery = "", initialCategory = "all" }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    let result = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.unit.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "featured") {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, query, category, sortBy]);

  const activeCategoryObj = categories.find((c) => c.id === category);

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setSortBy("default");
  }

  return (
    <div className="space-y-6">
      {/* Top Controls Bar: Search & Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, pulses, tea..."
            className="w-full pl-10 pr-9 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-900 rounded-full border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-sm">
          <span className="text-slate-500 text-xs font-semibold">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </span>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none outline-none font-semibold text-slate-800 cursor-pointer"
            >
              <option value="default">Sort by: Default</option>
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

      </div>

      {/* Category Filter Chips with Color Indicators */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all shadow-2xs ${
            category === "all"
              ? "bg-orange-600 text-white shadow-md shadow-orange-600/20 scale-105"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>All Items</span>
        </button>

        {categories.map((item) => {
          const isActive = category === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shadow-2xs ${
                isActive
                  ? "bg-slate-900 text-white shadow-md scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color || "#ea580c" }}
              />
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Filter Banner if filtered */}
      {(category !== "all" || query) && (
        <div className="flex items-center justify-between bg-orange-50/60 border border-orange-200/80 px-4 py-2 rounded-xl text-xs sm:text-sm">
          <p className="text-slate-700">
            Showing results {category !== "all" && <>in <strong className="text-orange-700">{activeCategoryObj?.name}</strong></>} {query && <>matching &ldquo;<strong className="text-orange-700">{query}</strong>&rdquo;</>}
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 hover:text-orange-800 underline ml-2"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      )}

      {/* Product Grid or Empty State */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 sm:p-16 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-2xl mb-4">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-900">No products found</h3>
          <p className="mt-2 text-sm text-slate-500">
            We couldn&apos;t find anything matching &ldquo;{query}&rdquo; in this category. Try checking your spelling or reset filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 btn-primary text-xs sm:text-sm"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
