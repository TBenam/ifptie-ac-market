"use client";

import { use, useState, useEffect } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { getProducts, getCategories } from "@/lib/bagisto/client";
import { Product, Category } from "@/types";
import { Filter, Sparkles, ArrowUpDown, SlidersHorizontal, Check } from "lucide-react";

export default function CatalogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedSearchParams = use(searchParams);
  const selectedCategorySlug = resolvedSearchParams.category || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState(selectedCategorySlug);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCatalog() {
      setLoading(true);
      const [allProds, allCats] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(allProds);
      setCategories(allCats);
      setLoading(false);
    }
    loadCatalog();
  }, []);

  // Filter and Sort Products
  let filteredProducts = activeCategory === "all"
    ? [...products]
    : products.filter((p) => p.category === activeCategory);

  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-teal-50 via-white to-amber-50/50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A9B8C]/10 text-[#0D6E64] text-xs font-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Catalogue Officiel IFPTIE-AC</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-slate-900">
            Tous nos Produits
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg">
            Découvrez nos équipements de climatisation haute efficacité, notre mode streetwear et nos gadgets high-tech.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs self-start md:self-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-500 ml-2" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none pr-3 cursor-pointer py-1.5"
          >
            <option value="featured">✨ Populaire & En Vedette</option>
            <option value="price-asc">💵 Prix: Moins Cher au Plus Cher</option>
            <option value="price-desc">💎 Prix: Plus Cher au Moins Cher</option>
            <option value="rating">⭐ Mieux Notés</option>
          </select>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 cursor-pointer ${
            activeCategory === "all"
              ? "bg-[#1A9B8C] text-white border-[#1A9B8C] shadow-md shadow-[#1A9B8C]/20"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
          }`}
        >
          Tous les Rayons ({products.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 cursor-pointer ${
              activeCategory === cat.slug
                ? "bg-[#1A9B8C] text-white border-[#1A9B8C] shadow-md shadow-[#1A9B8C]/20"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {cat.name} ({cat.itemCount})
          </button>
        ))}
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
        <span>Affichage de <strong>{filteredProducts.length}</strong> produit(s)</span>
        <span className="text-[#0D6E64] font-bold">✓ Livraison Express & COD disponible</span>
      </div>

      {/* Products Grid Render / Skeleton Loading */}
      {loading ? (
        <SkeletonGrid count={8} />
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <p className="text-slate-500 text-sm">Aucun produit ne correspond à vos critères.</p>
          <button
            onClick={() => setActiveCategory("all")}
            className="px-5 py-2.5 bg-[#1A9B8C] text-white rounded-xl text-xs font-bold"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
