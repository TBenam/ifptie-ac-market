"use client";

import { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { Sparkles } from "lucide-react";

interface TrendingSectionProps {
  products: Product[];
}

export function TrendingSection({ products }: TrendingSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const tabs = [
    { id: "all", label: "🌟 Tous les Incontournables" },
    { id: "climatisation-ac", label: "❄️ Climatiseurs AC" },
    { id: "mode-luxe", label: "👗 Mode & Streetwear" },
    { id: "high-tech", label: "🎧 High-Tech & Audio" },
  ];

  const filteredProducts = activeTab === "all"
    ? products
    : products.filter((p) => p.category === activeTab);

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A9B8C]/10 text-[#1A9B8C] text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sélection Spéciale 2026</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900">
            Tendances & Coups de Cœur
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Les articles les plus plébiscités par nos clients cette semaine
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 self-start md:self-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#1A9B8C] text-white shadow-md shadow-[#1A9B8C]/20 scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
