"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Clock, ArrowRight, Flame } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

interface FlashSaleSectionProps {
  products: Product[];
}

export function FlashSaleSection({ products }: FlashSaleSectionProps) {
  // 12 hours countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.slice(0, 4);

  return (
    <section className="relative rounded-3xl bg-gradient-to-br from-amber-50 via-white to-teal-50/50 border border-amber-200/80 p-6 sm:p-10 shadow-sm overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1A9B8C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title & Live Countdown Timer */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-amber-200/60 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-black tracking-wide uppercase mb-2">
            <Flame className="w-4 h-4 fill-red-600 animate-bounce" />
            <span>Offres Limitées dans le Temps</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
            <span>⚡ VENTES FLASH DU JOUR</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Profitez de réductions exclusives jusqu'à épuisement des stocks disponibles.
          </p>
        </div>

        {/* Countdown Timer Display */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900 text-white p-2.5 sm:p-3 rounded-2xl shadow-md border border-slate-800">
          <Clock className="w-5 h-5 text-[#F5A623] shrink-0 ml-1" />
          <span className="text-xs font-bold text-slate-300 mr-2 hidden sm:inline">Fin dans :</span>

          <div className="flex items-center gap-1.5 font-mono font-black text-base sm:text-lg">
            <div className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 min-w-[36px] text-center">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span className="text-[#F5A623]">:</span>
            <div className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 min-w-[36px] text-center">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span className="text-[#F5A623]">:</span>
            <div className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 min-w-[36px] text-center text-[#F5A623]">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Flash Sale Products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {flashProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom Action */}
      <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">
          🔥 Plus de 34 personnes ont profité des ventes flash au cours des 2 dernières heures.
        </span>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1A9B8C] hover:text-[#0D6E64] transition-colors"
        >
          <span>Voir toutes les offres</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
