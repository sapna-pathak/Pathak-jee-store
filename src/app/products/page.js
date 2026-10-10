import categories from "@/app/data/category.json";
import products from "@/app/data/product.json";
import ProductCatalog from "@/component/ProductCatalog";
import { MessageCircle, Sparkles, Store } from "lucide-react";

export const metadata = {
  title: "Products & Rates | Pathak Jee General Store",
  description: "Browse 500+ grocery essentials with current rates, category filters, and 1-click WhatsApp home delivery.",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const initialQuery = typeof params.q === "string" ? params.q : "";
  const initialCategory = typeof params.category === "string" ? params.category : "all";

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white py-12 sm:py-16">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Transparent Local Store Rates</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                Products &amp; Daily Rates
              </h1>
              <p className="mt-2 text-orange-100 max-w-xl text-sm sm:text-base leading-relaxed">
                Browse our entire inventory of 500+ kitchen essentials. Prices are indicative store rates updated regularly. Order in 1-click via WhatsApp!
              </p>
            </div>

            <a
              href="https://wa.me/919650500935?text=Hello%20Pathak%20Jee%20Store%2C%20I%20want%20to%20place%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-5 py-3 rounded-full font-bold text-sm shadow-lg transition-transform hover:scale-105 shrink-0 self-start md:self-auto"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Send Grocery List on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="container-page py-10">
        <ProductCatalog
          products={products}
          categories={categories}
          initialQuery={initialQuery}
          initialCategory={initialCategory}
        />
      </section>
    </div>
  );
}
