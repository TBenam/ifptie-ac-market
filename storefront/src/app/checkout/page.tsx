"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, ArrowLeft, CheckCircle2, ShoppingBag, PhoneCall, MapPin } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { createCODOrder } from "@/lib/bagisto/client";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "Douala",
    address: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    message: string;
  } | null>(null);

  const subtotal = getSubtotal();
  const freeShippingThreshold = 200000;
  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 2500;
  const totalAmount = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Veuillez remplir tous les champs obligatoires (Nom, Téléphone et Adresse).");
      return;
    }

    setIsSubmitting(true);

    const result = await createCODOrder({
      customer: formData,
      items: items.map((item) => ({
        productId: item.product.id,
        variantId: item.selectedVariant?.id,
        quantity: item.quantity,
      })),
    });

    setIsSubmitting(false);

    if (result.success) {
      setCompletedOrder({
        orderNumber: result.orderNumber,
        message: result.message,
      });
      clearCart();
    }
  };

  if (items.length === 0 && !completedOrder) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-xl font-bold text-slate-900">Votre panier est vide</h2>
        <p className="text-xs text-slate-500">Ajoutez des articles à votre panier pour finaliser votre commande.</p>
        <Link
          href="/catalog"
          className="inline-block px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-[#0D9488] transition-colors"
        >
          Voir le Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0D9488] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Continuer mes achats</span>
      </Link>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-[#0D9488]" />
            <span>Finaliser ma commande (Paiement à la Livraison)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Paiement 100% en espèces à la livraison. Aucun paiement en ligne requis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Customer Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <h2 className="font-heading text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0D9488]" />
              <span>1. Informations de Livraison (Cameroun)</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nom complet *</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Ex: Paul Mbarga"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0D9488] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Numéro de Téléphone (WhatsApp / Appel) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Ex: 6 99 00 00 00"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0D9488] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ville de Livraison *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:border-[#0D9488] focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="Douala">Douala (Akwa, Bonapriso, Bonamoussadi...)</option>
                  <option value="Yaoundé">Yaoundé (Bastos, Omnisports, Mendong...)</option>
                  <option value="Bafoussam">Bafoussam</option>
                  <option value="Kribi">Kribi</option>
                  <option value="Limbe">Limbe</option>
                  <option value="Garoua">Garoua</option>
                  <option value="Autre Ville">Autre Ville / Région</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quartier & Précision d'adresse *</label>
              <input
                type="text"
                name="address"
                required
                placeholder="Ex: Quartier Akwa, Rue Pau, face Total"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0D9488] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Repère ou consigne pour le livreur</label>
              <textarea
                name="notes"
                rows={2}
                placeholder="Heure préférentielle de passage, carrefour..."
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0D9488] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Mode de Règlement */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h2 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0D9488]" />
                <span>2. Mode de Règlement</span>
              </h2>

              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0D9488] flex items-center justify-center text-white font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-slate-900">Paiement en Espèces à la Livraison (COD)</h4>
                    <p className="text-[11px] text-slate-600">Vous réglez le livreur en espèces uniquement après réception de votre colis.</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-[#0D9488] text-white font-extrabold text-sm shadow-md active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Validation en cours..." : "Confirmer ma Commande (Payer à la Réception)"}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 sticky top-28">
            <h3 className="font-heading text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Récapitulatif de la Commande
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs gap-3">
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <Image src={item.product.featuredImage} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                    <span className="text-slate-500 text-[11px]">Qté: {item.quantity}</span>
                  </div>
                  <span className="font-heading font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span className="font-bold text-[#0D9488]">
                  {shippingFee === 0 ? "Offerte" : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-3 border-t border-slate-200">
                <span className="font-heading">Total à Payer (COD)</span>
                <span className="font-heading text-lg font-black text-[#0D9488]">{formatPrice(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs" />
          <div className="relative max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-2xl z-10">
            <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-[#0D9488] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                N° {completedOrder.orderNumber}
              </span>
              <h2 className="font-heading text-2xl font-black text-slate-900 mt-3">Commande Confirmée !</h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {completedOrder.message}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
              <div className="text-slate-600">Règlement : <strong className="text-[#0D9488]">Espèces à la livraison</strong></div>
              <div className="text-slate-600">Délai estimé : <strong className="text-slate-900">24 à 48 heures</strong></div>
            </div>

            <div className="space-y-2">
              <Link
                href="/track-order"
                className="block w-full py-3.5 rounded-xl bg-[#0D9488] text-white font-bold text-xs hover:bg-[#0F766E] transition-colors"
              >
                Suivre l'avancement de ma commande
              </Link>
              <Link
                href="/"
                onClick={() => setCompletedOrder(null)}
                className="block w-full py-2.5 rounded-xl text-slate-600 font-bold text-xs hover:text-slate-900 transition-colors"
              >
                Retourner à l'Accueil
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
