"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, X } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/bagisto/mockData";

interface SocialPurchase {
  customerName: string;
  location: string;
  productIndex: number;
  timeAgo: string;
}

const CAMEROON_PURCHASES: SocialPurchase[] = [
  { customerName: "Paul M.", location: "Douala (Akwa)", productIndex: 1, timeAgo: "il y a 3 min" },
  { customerName: "Brenda K.", location: "Yaoundé (Bastos)", productIndex: 2, timeAgo: "il y a 7 min" },
  { customerName: "Rodrigue T.", location: "Douala (Bonamoussadi)", productIndex: 3, timeAgo: "il y a 12 min" },
  { customerName: "Danielle N.", location: "Yaoundé (Mendong)", productIndex: 1, timeAgo: "il y a 18 min" },
  { customerName: "Junior F.", location: "Douala (Bonapriso)", productIndex: 0, timeAgo: "il y a 24 min" },
  { customerName: "Carine M.", location: "Yaoundé (Omnisports)", productIndex: 2, timeAgo: "il y a 31 min" },
  { customerName: "Arnaud E.", location: "Douala (Makepe)", productIndex: 3, timeAgo: "il y a 42 min" },
  { customerName: "Sandrine T.", location: "Yaoundé (Biyem-Assi)", productIndex: 1, timeAgo: "il y a 55 min" },
];

export function LiveSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Initial delay before first popup
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Interval to cycle through purchases every 28 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % CAMEROON_PURCHASES.length);
        setIsVisible(true);
      }, 800);
    }, 28000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const currentPurchase = CAMEROON_PURCHASES[currentIndex];
  const product = MOCK_PRODUCTS[currentPurchase.productIndex] || MOCK_PRODUCTS[0];

  return (
    <aside aria-label="Achats récents" className="fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl flex items-center gap-3 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      {/* Product Image */}
      <Link href={`/product/${product.slug}`} className="relative w-12 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
        <Image
          src={product.featuredImage}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>

      {/* Purchase Details */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="font-extrabold text-slate-900 truncate">
            {currentPurchase.customerName}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-[#0D9488] font-bold truncate">
            {currentPurchase.location}
          </span>
        </div>

        <Link href={`/product/${product.slug}`} className="block">
          <p className="font-heading text-xs font-semibold text-slate-700 truncate hover:text-[#0D9488] transition-colors mt-0.5">
            A commandé : {product.name}
          </p>
        </Link>

        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
          <span className="flex items-center gap-1 text-[#0D9488] font-medium">
            <CheckCircle2 className="w-3 h-3" /> Achat vérifié
          </span>
          <span>•</span>
          <span>{currentPurchase.timeAgo}</span>
        </div>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => setIsDismissed(true)}
        className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
        title="Fermer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
