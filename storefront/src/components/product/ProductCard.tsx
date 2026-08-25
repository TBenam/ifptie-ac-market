"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Eye, Star, Check, Heart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openQuickView = useUIStore((state) => state.openQuickView);

  const discount = calculateDiscount(product.price, product.originalPrice);
  const secondaryImage = product.galleryImages && product.galleryImages.length > 1 
    ? product.galleryImages[1] 
    : product.featuredImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.variants?.[0]);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div 
      className="group relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
        {discount && (
          <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            -{discount}%
          </span>
        )}
      </div>

      {/* Action Buttons (Wishlist & Quick View) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={toggleWishlist}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
            isWishlisted
              ? "bg-red-50 text-red-500"
              : "bg-white/90 text-slate-500 hover:text-red-500 hover:bg-white"
          }`}
          title="Favoris"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
        </button>

        <button
          onClick={handleQuickView}
          className="w-8 h-8 rounded-full bg-white/90 text-slate-500 hover:text-slate-900 hover:bg-white flex items-center justify-center transition-all shadow-xs opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 cursor-pointer"
          title="Aperçu Rapide"
          aria-label="Aperçu Rapide"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* 3:4 Image Container with Hover Swap */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[3/4] w-full overflow-hidden bg-slate-100">
        <Image
          src={product.featuredImage}
          alt={product.name}
          fill
          className={`object-cover object-center transition-all duration-500 ease-out ${
            isHovered && secondaryImage !== product.featuredImage 
              ? "opacity-0 scale-105" 
              : "opacity-100 group-hover:scale-105"
          }`}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {secondaryImage !== product.featuredImage && (
          <Image
            src={secondaryImage}
            alt={`${product.name} vue secondaire`}
            fill
            className={`object-cover object-center transition-all duration-500 ease-out absolute inset-0 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="uppercase tracking-wider text-[10px] text-[#0D9488] font-bold">
              {product.category.replace("-", " ")}
            </span>
            <div className="flex items-center gap-1 text-[#D97706] text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#D97706]" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#0D9488] transition-colors">
            <h3 className="font-heading text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-extrabold text-slate-900 font-heading">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 ${
              isAdded
                ? "bg-[#0D9488] text-white"
                : "bg-slate-900 hover:bg-[#0D9488] text-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Ajouter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
