"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, PhoneCall, ShieldCheck, ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearched(true);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0D9488] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour à la boutique</span>
      </Link>

      {/* Page Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0D9488] text-xs font-bold border border-teal-200/60">
          <Truck className="w-3.5 h-3.5" />
          <span>Suivi Logistique en Direct</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-slate-900">
          Suivre l'État de ma Commande
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Entrez votre numéro de commande (ex: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">ORD-COD-849201</code>) ou votre numéro de téléphone pour voir l'avancement de votre livraison en temps réel.
        </p>
      </div>

      {/* Search Bar Box */}
      <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            required
            placeholder="N° de commande ou Téléphone (ex: ORD-COD-123456)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-2xl py-3.5 pl-11 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0D9488] shadow-xs"
          />
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-6 py-3.5 bg-slate-900 hover:bg-[#0D9488] text-white rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isSearching ? "Recherche..." : "Suivre"}
        </button>
      </form>

      {/* Order Status Display (Simulated Tracker) */}
      {searched && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in zoom-in-95 duration-300">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-[#0D9488] bg-teal-50 px-2.5 py-1 rounded-md">
                {orderId.toUpperCase().includes("ORD") ? orderId.toUpperCase() : `ORD-COD-${Math.floor(100000 + Math.random() * 900000)}`}
              </span>
              <h2 className="font-heading text-xl font-bold text-slate-900 mt-2">
                Statut : <span className="text-[#0D9488]">Livreur en Route vers votre adresse 🚚</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Livraison estimée : Aujourd'hui entre 14h00 et 18h00</p>
            </div>

            <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-2xl">
              <span className="text-xs text-slate-500 block">Mode de Règlement</span>
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5 sm:justify-end">
                <ShieldCheck className="w-4 h-4 text-[#0D9488]" /> Espèces à la livraison
              </span>
            </div>
          </div>

          {/* 4-Step Interactive Delivery Timeline */}
          <div className="relative py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Step 1 */}
              <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">1. Commande Reçue</h4>
                  <p className="text-[11px] text-slate-500">Validée par notre équipe</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">2. Colis Préparé</h4>
                  <p className="text-[11px] text-slate-500">Prêt au dépôt central</p>
                </div>
              </div>

              {/* Step 3 (Active) */}
              <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#D97706] text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-amber-100 shrink-0 animate-bounce">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 text-[#D97706]">3. En Cours de Livraison</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">Livreur assigné</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-400">4. Livré & Payé</h4>
                  <p className="text-[11px] text-slate-400">Remise en main propre</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Driver Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold text-base border border-teal-200">
                🚚
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Livreur Express Assigné</span>
                <h4 className="font-heading font-bold text-sm text-slate-900">Mamadou (Flotte IFPTIE-AC)</h4>
              </div>
            </div>

            <a
              href="tel:+221770000000"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 hover:text-[#0D9488] shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Appeler le service de livraison</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
