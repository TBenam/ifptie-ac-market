"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal, getTotalItems } = useCartStore();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const freeShippingThreshold = 200000;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Overlay Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#1A9B8C]/10 rounded-xl text-[#1A9B8C]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-base text-slate-900">Mon Panier</h3>
                <p className="text-xs text-slate-500">{totalItems} article(s) sélectionné(s)</p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-teal-50/70 p-3.5 px-5 border-b border-teal-100">
            <div className="flex items-center justify-between text-xs mb-1.5 font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#1A9B8C]" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-[#0D6E64] font-black">Livraison Gratuite Débloquée ! 🎉</span>
                ) : (
                  <span>
                    Plus que <strong className="text-[#0D6E64]">{formatPrice(freeShippingThreshold - subtotal)}</strong> pour la livraison offerte !
                  </span>
                )}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1A9B8C] to-[#22C4B0] transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-slate-900 mb-1">Votre panier est vide</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Découvrez nos collections de climatiseurs, mode et high-tech et ajoutez vos coups de cœur.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#1A9B8C] text-white font-bold text-xs hover:bg-[#0D6E64] transition-colors cursor-pointer"
                >
                  Explorer la Boutique
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 relative group"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                    <Image
                      src={item.product.featuredImage}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading text-xs font-bold text-slate-900 line-clamp-1 pr-6">
                        {item.product.name}
                      </h4>
                      {item.selectedVariant && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {item.selectedVariant.name}
                        </p>
                      )}
                      <p className="font-heading text-sm font-black text-slate-900 mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-0.5 shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-slate-500 hover:text-slate-900 p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-900 px-2 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-slate-500 hover:text-slate-900 p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3 shadow-lg">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison (COD)</span>
                  <span className="font-bold text-[#0D6E64]">
                    {subtotal >= freeShippingThreshold ? "Offerte" : "2 500 FCFA"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span className="font-heading">Total à payer à la livraison</span>
                  <span className="font-heading text-lg font-black text-slate-900">
                    {formatPrice(subtotal >= freeShippingThreshold ? subtotal : subtotal + 2500)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#0D6E64] bg-teal-50 p-2.5 rounded-xl border border-teal-200">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#1A9B8C]" />
                <span className="font-medium">Paiement en espèces lors de la remise du colis.</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#1A9B8C] to-[#0D6E64] hover:from-[#22C4B0] hover:to-[#1A9B8C] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#1A9B8C]/25 active:scale-98 transition-all cursor-pointer"
              >
                <span>Commander maintenant (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
