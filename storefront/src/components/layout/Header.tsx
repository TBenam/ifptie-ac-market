"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ShoppingBag, Search, Menu, X, ShieldCheck, Truck, PhoneCall, Package, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { MOCK_PRODUCTS } from "@/lib/bagisto/mockData";
import { formatPrice } from "@/lib/utils";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const totalItems = useCartStore((state) => state.getTotalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  // Filter products for live dropdown search
  const filteredSearchProducts = searchQuery.trim() === ""
    ? []
    : MOCK_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
      {/* Top Announcement Bar with Tracking Link */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Livraison Express 24-48h • Paiement en espèces à la livraison (COD)</span>
            </span>
          </div>

          <div className="flex items-center gap-5 text-slate-300">
            <Link href="/track-order" className="hover:text-white flex items-center gap-1.5 font-semibold text-teal-300 transition-colors">
              <Package className="w-3.5 h-3.5" />
              <span>Suivre ma commande</span>
            </Link>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a href="tel:+237600000000" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-[#0D9488]" />
              <span>Service Client : +237 6 00 00 00 00</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Left: Mobile Burger & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200 p-0.5 shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.jpg"
                alt="IFPTIE-AC Market"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                <span className="text-[#0D9488]">IFPTIE-AC</span> <span className="text-[#D97706]">MARKET</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-1">
                Boutique Officielle
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="/" className="hover:text-[#0D9488] transition-colors">
            Accueil
          </Link>
          <Link href="/catalog" className="hover:text-[#0D9488] transition-colors">
            Tous les Produits
          </Link>
          <Link href="/catalog?category=mode-luxe" className="hover:text-[#0D9488] transition-colors">
            Mode & Tendances
          </Link>
          <Link href="/catalog?category=high-tech" className="hover:text-[#0D9488] transition-colors">
            High-Tech & Smart
          </Link>
          <Link href="/catalog?category=accessoires-chaussures" className="hover:text-[#0D9488] transition-colors">
            Chaussures & Maroquinerie
          </Link>
        </nav>

        {/* Right: Live Search Box & Cart */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Live Search Box with Instant Dropdown */}
          <div ref={searchRef} className="relative hidden md:block w-64 lg:w-72">
            <input
              type="text"
              placeholder="Rechercher mode, tech, chaussures..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0D9488] focus:bg-white transition-all shadow-xs"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />

            {/* Live Search Dropdown */}
            {isSearchOpen && filteredSearchProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl p-3 space-y-2 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[10px] uppercase font-bold text-slate-400 px-2">Suggestions directes</div>
                {filteredSearchProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <Image src={p.featuredImage} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-xs font-bold text-slate-900 truncate group-hover:text-[#0D9488]">
                        {p.name}
                      </h4>
                      <p className="text-[11px] font-extrabold text-[#D97706]">{formatPrice(p.price)}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0D9488] shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            className="relative p-2.5 rounded-full bg-slate-900 text-white hover:bg-[#0D9488] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            aria-label="Panier"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D97706] text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Slide-Over Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 left-0 w-80 max-w-[80vw] bg-white shadow-2xl p-6 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white border border-slate-200 p-0.5">
                    <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                  </div>
                  <span className="font-heading font-extrabold text-base text-slate-900">
                    <span className="text-[#0D9488]">IFPTIE-AC</span> <span className="text-[#D97706]">MARKET</span>
                  </span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-xl font-bold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  Accueil
                </Link>
                <Link
                  href="/catalog"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Tous les Produits
                </Link>
                <Link
                  href="/catalog?category=mode-luxe"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  👗 Mode & Tendances
                </Link>
                <Link
                  href="/catalog?category=high-tech"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  🎧 High-Tech & Smart
                </Link>
                <Link
                  href="/track-order"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-xl font-bold text-sm text-[#0D9488] bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                  📦 Suivre ma Commande
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-3">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <PhoneCall className="w-4 h-4 text-[#0D9488]" />
                <span>+237 6 00 00 00 00</span>
              </div>
              <p>Livraison rapide à Douala, Yaoundé et tout le Cameroun (Paiement COD).</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
