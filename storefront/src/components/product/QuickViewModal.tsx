"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X, ShoppingBag, Star, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, calculateDiscount } from "@/lib/utils";

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useUIStore();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const activeVariant = quickViewProduct.variants[selectedVariantIndex] || quickViewProduct.variants[0];
  const price = activeVariant?.price || quickViewProduct.price;
  const originalPrice = activeVariant?.originalPrice || quickViewProduct.originalPrice;
  const discount = calculateDiscount(price, originalPrice);

  const handleAddToCart = () => {
    addItem(quickViewProduct, activeVariant);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-500 hover:text-slate-900 border border-slate-200 shadow-md cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-[3/4] md:aspect-auto w-full bg-slate-100 flex items-center justify-center">
          <Image
            src={activeVariant?.image || quickViewProduct.featuredImage}
            alt={quickViewProduct.name}
            fill
            className="object-cover"
          />
          {discount && (
            <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
              -{discount}%
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
          <div>
            <span className="text-[10px] uppercase font-extrabold text-[#1A9B8C] tracking-wider bg-[#1A9B8C]/10 px-2.5 py-0.5 rounded-full">
              {quickViewProduct.category.replace("-", " ")}
            </span>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-2 leading-snug">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center gap-1 text-[#F5A623] font-bold">
                <Star className="w-3.5 h-3.5 fill-[#F5A623]" />
                <span>{quickViewProduct.rating}</span>
              </div>
              <span className="text-slate-400">({quickViewProduct.reviewCount} avis)</span>
              <span className="text-[#0D6E64] bg-teal-50 px-2 py-0.5 rounded text-[11px] font-bold">
                En Stock ({quickViewProduct.stock})
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            {/* Price Display */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-heading text-2xl font-black text-slate-900">
                {formatPrice(price)}
              </span>
              {originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            {/* Variants Selector */}
            {quickViewProduct.variants.length > 1 && (
              <div className="mt-4 space-y-2">
                <label className="text-xs font-bold text-slate-700">Variante disponible :</label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedVariantIndex === index
                          ? "bg-[#1A9B8C] text-white border-[#1A9B8C] shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#1A9B8C]"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-md cursor-pointer ${
                isAdded
                  ? "bg-[#1A9B8C] text-white"
                  : "bg-slate-900 hover:bg-[#1A9B8C] text-white hover:shadow-[#1A9B8C]/25"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Ajouté au panier !</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au Panier</span>
                </>
              )}
            </button>

            <Link
              href={`/product/${quickViewProduct.slug}`}
              onClick={closeQuickView}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
            >
              <span>Voir la fiche produit complète</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
