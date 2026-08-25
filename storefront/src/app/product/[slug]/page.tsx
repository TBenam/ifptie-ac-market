"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, Truck, ShoppingBag, Check, PhoneCall, CheckCircle2 } from "lucide-react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantSelector } from "@/components/product/VariantSelector";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SkeletonPDP } from "@/components/ui/SkeletonPDP";
import { WhatsAppButton } from "@/components/product/WhatsAppButton";
import { getProductBySlug, getProducts } from "@/lib/bagisto/client";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Product, ProductVariant } from "@/types";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const prod = await getProductBySlug(slug);
      if (!prod) {
        setLoading(false);
        return;
      }
      setProduct(prod);

      if (prod.variants && prod.variants.length > 0) {
        const initialVariant = prod.variants[0];
        setSelectedVariant(initialVariant);
        setSelectedAttributes(initialVariant.attributes || {});
      }

      const allProds = await getProducts();
      setRelatedProducts(allProds.filter((p) => p.id !== prod.id && p.category === prod.category).slice(0, 4));
      setLoading(false);
    }

    loadData();
  }, [slug]);

  if (loading) {
    return <SkeletonPDP />;
  }

  if (!product) {
    notFound();
  }

  const price = selectedVariant?.price || product.price;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const discount = calculateDiscount(price, originalPrice);

  const handleAttributeChange = (attrName: string, optionVal: string) => {
    const updatedAttrs = { ...selectedAttributes, [attrName]: optionVal };
    setSelectedAttributes(updatedAttrs);

    const matchingVariant = product.variants.find((v) => {
      return Object.entries(updatedAttrs).every(([key, val]) => v.attributes[key] === val);
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    }
  };

  const handleAddToCart = () => {
    addItem(product, selectedVariant || product.variants[0], selectedAttributes);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <Link href="/" className="hover:text-slate-900 transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-slate-900 transition-colors">Catalogue</Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.galleryImages}
            productName={product.name}
          />
        </div>

        {/* Right: Buy Box & Product Info */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-3">
            {/* Category & Stock */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold text-[#0D9488] tracking-wider bg-teal-50 px-2.5 py-1 rounded-md">
                {product.category.replace("-", " ")}
              </span>
              <span className="text-xs font-bold text-[#0D9488] bg-teal-50/80 px-2.5 py-1 rounded-md">
                ✓ En Stock ({product.stock} unités)
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 text-[#D97706] font-bold">
                <Star className="w-4 h-4 fill-[#D97706]" />
                <span>{product.rating}</span>
              </div>
              <span className="text-slate-400">({product.reviewCount} avis clients vérifiés)</span>
            </div>

            {/* Price Display */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="font-heading text-3xl sm:text-4xl font-black text-slate-900">
                {formatPrice(price)}
              </span>
              {originalPrice && (
                <span className="text-base text-slate-400 line-through font-medium">
                  {formatPrice(originalPrice)}
                </span>
              )}
              {discount && (
                <span className="text-xs font-extrabold bg-red-100 text-red-700 px-2.5 py-1 rounded-md">
                  Économisez {discount}%
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {product.shortDescription}
            </p>

            {/* Variant Selector */}
            {product.attributes && product.attributes.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <VariantSelector
                  attributes={product.attributes}
                  variants={product.variants}
                  selectedAttributes={selectedAttributes}
                  onChangeAttribute={handleAttributeChange}
                />
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            {/* Standard Add to Cart (COD) */}
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-4 px-6 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer ${
                isAdded
                  ? "bg-[#0D9488] text-white"
                  : "bg-slate-900 hover:bg-[#0D9488] text-white"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Produit Ajouté au Panier !</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Ajouter au Panier (Paiement à la Livraison)</span>
                </>
              )}
            </button>

            {/* WhatsApp 1-Click Order Button */}
            <WhatsAppButton
              product={product}
              selectedVariant={selectedVariant}
              className="w-full"
            />

            {/* Reassurance Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <Truck className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>Livraison Express 24-48h</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Paiement à la réception</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details & Specs Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("description")}
            className={`font-heading text-sm sm:text-base font-bold pb-3 -mb-3 transition-colors cursor-pointer ${
              activeTab === "description"
                ? "text-[#0D9488] border-b-2 border-[#0D9488]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Description Complète
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`font-heading text-sm sm:text-base font-bold pb-3 -mb-3 transition-colors cursor-pointer ${
              activeTab === "specs"
                ? "text-[#0D9488] border-b-2 border-[#0D9488]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Fiche Technique
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`font-heading text-sm sm:text-base font-bold pb-3 -mb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "reviews"
                ? "text-[#0D9488] border-b-2 border-[#0D9488]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>Avis Clients ({product.reviewCount})</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "description" && (
          <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line space-y-4">
            <p>{product.description}</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="space-y-3 text-xs text-slate-700">
            <div className="grid grid-cols-2 p-3 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-500">Référence (SKU)</span>
              <span className="font-bold text-slate-900">{selectedVariant?.sku || product.variants?.[0]?.sku || "IFPTIE-AC-01"}</span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-white">
              <span className="font-semibold text-slate-500">Catégorie</span>
              <span className="font-bold text-slate-900 capitalize">{product.category.replace("-", " ")}</span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-500">Mode de Paiement</span>
              <span className="font-bold text-[#0D9488]">Espèces à la livraison (Cash on Delivery)</span>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Moussa S. (Douala)</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span className="text-[10px] text-[#0D9488] font-semibold bg-teal-50 px-1.5 py-0.5 rounded">Acheteur Vérifié</span>
                </span>
                <span className="text-slate-400">Il y a 3 jours</span>
              </div>
              <div className="flex text-[#D97706]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-[#D97706]" />
                ))}
              </div>
              <p className="text-xs text-slate-600">
                "Livré le lendemain à Akwa (Douala). Le livreur m'a appelé avant de venir et j'ai réglé en espèces après avoir ouvert le colis. Top qualité !"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductGrid
          products={relatedProducts}
          title="Produits Similaires Recommandés"
          subtitle="D'autres articles susceptibles de vous intéresser"
        />
      )}
    </div>
  );
}
